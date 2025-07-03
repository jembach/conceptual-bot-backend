import BotLinkerStrategy from "../../interfaces/BotLinkerStrategyInterface";
import IBotModel, {
  IProcessTree,
  IProcessTreeNodeInfo,
  IProcessTreeStructure,
} from "../../interfaces/BotModelInterface";
import { flattenContextContainersInProcessTree } from "../../utils/processTreeUtils";
import { create } from "xmlbuilder2";
import tasktMapping from "./tasktMapping";

interface ScriptCommand {
  "@xsi:type": string;
  "@CommandName": string;
  "@SelectionName": string;
}

const ifScriptCommand: ScriptCommand = {
  "@xsi:type": "BeginIfCommand",
  "@CommandName": "BeginIfCommand",
  "@SelectionName": "Begin If",
};
const elseScriptCommand: ScriptCommand = {
  "@xsi:type": "ElseCommand",
  "@CommandName": "ElseCommand",
  "@SelectionName": "Else",
};
const endIfScriptCommand: ScriptCommand = {
  "@xsi:type": "EndIfCommand",
  "@CommandName": "EndIfCommand",
  "@SelectionName": "End If",
};

class TasktLinker implements BotLinkerStrategy {
  botModel?: IBotModel;

  botObject: any = {};
  commands: any[] = [];
  processTreeNodes?: Record<string, IProcessTreeNodeInfo>;

  linkBot(botModel: IBotModel): string {
    this.botModel = botModel;

    const parsedProcessTree: IProcessTree = JSON.parse(
      this.botModel.processTree
    );
    const containerFlattenedTree: IProcessTree =
      flattenContextContainersInProcessTree(parsedProcessTree);

    this.processTreeNodes = containerFlattenedTree.nodeInfo;

    this.commands = this.parseProcessTree([containerFlattenedTree.tree]);

    this.setupBotDocument();
    const botDocument = create(this.botObject);
    const botXml = botDocument.end({ prettyPrint: true });
    return botXml;
  }

  setupBotDocument() {
    this.botObject["Script"] = {
      "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "@xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
    };
    this.botObject["Script"]["Commands"] = {};
    this.botObject["Script"]["Commands"]["ScriptAction"] = [];
    this.commands.forEach((command) => {
      this.botObject["Script"]["Commands"]["ScriptAction"].push({
        ScriptCommand: command,
      });
    });
  }

  private parseProcessTree(
    processTreeArray: (IProcessTreeStructure | string)[]
  ): any[] {
    let commands: any[] = [];

    processTreeArray.forEach((processTreePart) => {
      if (
        typeof processTreePart === "string" ||
        processTreePart instanceof String
      ) {
        // console.log("Found leaf " + processTreePart);

        const commandForElement = this.getCommandForElement(
          processTreePart as string
        );

        if (!commandForElement) {
          return;
        }
        const scriptCommand: ScriptCommand = {
          "@xsi:type": commandForElement,
          "@CommandName": commandForElement,
          "@SelectionName": this.getLabelForElement(processTreePart as string),
        };

        commands.push(scriptCommand);
        return;
      }

      for (const subProcessTreeKey in processTreePart) {
        // console.log("we have a " + subProcessTreeKey);
        if (subProcessTreeKey.includes("Gateway")) {
          commands = commands.concat(
            this.parseDecision(processTreePart[subProcessTreeKey])
          );
        } else {
          commands = commands.concat(
            this.parseProcessTree(processTreePart[subProcessTreeKey])
          );
        }
      }
    });
    return commands;
  }

  private parseDecision(
    processTreeArray: (IProcessTreeStructure | string)[]
  ): string[] {
    let commands: any[] = [ifScriptCommand];

    processTreeArray.forEach((processTree) => {
      commands = commands.concat(this.parseProcessTree([processTree]));
      commands.push(elseScriptCommand);
    });
    commands.pop();
    commands.push(endIfScriptCommand);
    return commands;
  }

  private getLabelForElement(element: string): string {
    return this.processTreeNodes![element].label;
  }

  private getCommandForElement(element: string): string {
    const concept = this.processTreeNodes![element].concept;
    if (!(concept in tasktMapping!)) {
      throw new Error("No mapping for " + concept + " to taskt found.");
    }
    return tasktMapping[concept].command;
  }
}

export default TasktLinker;
