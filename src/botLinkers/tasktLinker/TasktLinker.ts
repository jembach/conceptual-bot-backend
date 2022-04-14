import BotLinkerStrategy from "src/interfaces/BotLinkerStrategyInterface";
import IBotModel, {
  IProcessTree,
  IProcessTreeNodeInfo,
  IProcessTreeStructure,
} from "src/interfaces/BotModelInterface";
import { create } from "xmlbuilder2";
import tasktMapping from "./tasktMapping";

interface ScriptCommand {
  "@xsi:type": string;
  "@CommandName": string;
  "@SelectionName": string;
}

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

    this.processTreeNodes = parsedProcessTree.nodeInfo;

    this.commands = this.parseProcessTree([parsedProcessTree.tree]);

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
        console.log("Found leaf " + processTreePart);
        const scriptCommand: ScriptCommand = {
          "@xsi:type": this.getCommandForElement(processTreePart as string),
          "@CommandName": this.getCommandForElement(processTreePart as string),
          "@SelectionName": this.getLabelForElement(processTreePart as string),
        };

        commands.push(scriptCommand);
        return;
      }

      for (const subProcessTreeKey in processTreePart) {
        console.log("we have a " + subProcessTreeKey);
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
    let commands: any[] = [];

    processTreeArray.forEach((processTree) => {
      commands = commands.concat(this.parseProcessTree([processTree]));
    });
    return commands;
  }

  private getLabelForElement(element: string): string {
    return this.processTreeNodes![element].label;
  }

  private getCommandForElement(element: string): string {
    const concept = this.processTreeNodes![element].concept;
    return tasktMapping[concept].command;
  }
}

export default TasktLinker;
