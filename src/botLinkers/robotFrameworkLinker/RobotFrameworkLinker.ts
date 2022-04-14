import BotLinker from "src/interfaces/BotLinkerStrategyInterface";
import IBotModel, {
  IProcessTree,
  IProcessTreeNodeInfo,
  IProcessTreeStructure,
} from "src/interfaces/BotModelInterface";
import robotFrameworkMapping from "./robotFrameworkMapping";

class RobotFrameworkLinker implements BotLinker {
  readonly indentationCharacter = "  ";
  botModel?: IBotModel;
  processTree?: IProcessTreeStructure;
  processTreeNodes?: Record<string, IProcessTreeNodeInfo>;

  linkBot(botModel: IBotModel): string {
    this.botModel = botModel;
    let robotLines: string[] = [];

    const parsedProcessTree: IProcessTree = JSON.parse(
      this.botModel.processTree
    );

    this.processTree = parsedProcessTree.tree;
    this.processTreeNodes = parsedProcessTree.nodeInfo;

    robotLines = robotLines.concat(this.generateSettingsSection().join("\n"));
    robotLines.push("\n");
    robotLines = robotLines.concat(this.generateTasksSection().join("\n"));

    return robotLines.join("\n");
  }

  private parseProcessTree(
    processTreeArray: (IProcessTreeStructure | string)[],
    indentation: number
  ): string[] {
    let lines: string[] = [];

    console.group("New round");

    processTreeArray.forEach((processTreePart) => {
      if (
        typeof processTreePart === "string" ||
        processTreePart instanceof String
      ) {
        console.log("Found leaf " + processTreePart);

        lines.push(
          this.indentationCharacter.repeat(indentation) +
            this.getKeywordForElement(processTreePart as string)
        );
        return;
      }

      for (const subProcessTreeKey in processTreePart) {
        console.log("we have a " + subProcessTreeKey);
        if (subProcessTreeKey.includes("Gateway")) {
          lines = lines.concat(
            this.parseDecision(processTreePart[subProcessTreeKey], indentation)
          );
        } else {
          lines = lines.concat(
            this.parseProcessTree(
              processTreePart[subProcessTreeKey],
              indentation
            )
          );
        }
      }
    });
    return lines;
  }

  private parseDecision(
    processTreeArray: (IProcessTreeStructure | string)[],
    indentation: number
  ): string[] {
    let lines: string[] = [
      this.indentationCharacter.repeat(indentation) + "IF",
    ];
    processTreeArray.forEach((processTree) => {
      lines = lines.concat(
        this.parseProcessTree([processTree], indentation + 1)
      );
      lines.push(this.indentationCharacter.repeat(indentation) + "ELSE");
    });
    return lines;
  }

  private generateKeywordsSection(): string[] {
    return [];
  }

  private generateTasksSection(): string[] {
    let tasksLines = ["*** Tasks ***"];
    tasksLines = tasksLines.concat(
      this.parseProcessTree([this.processTree!], 0)
    );
    return tasksLines;
  }

  private generateSettingsSection(): string[] {
    let settingsLines: string[] = ["*** Settings ***"];

    settingsLines.push("Documentation\t" + this.botModel!.name);

    if (this.botModel!.description) {
      settingsLines.push("...\t" + this.botModel!.description);
    }

    settingsLines = settingsLines.concat(this.getUsedRFLibraries());

    return settingsLines;
  }

  private getUsedRFLibraries(): string[] {
    const usedLibraries: string[] = [];

    const setOfLibraries: Set<string> = new Set();

    for (const node in this.processTreeNodes) {
      try {
        setOfLibraries.add(this.getLibraryForElement(node));
      } catch (error) {
        throw new Error(
          "No mapping for " +
            this.processTreeNodes[node].concept +
            " to RobotFramework found."
        );
      }
    }

    setOfLibraries.forEach((library) =>
      usedLibraries.push("Library\t" + library)
    );

    return usedLibraries;
  }

  private getLibraryForElement(element: string): string {
    const concept = this.processTreeNodes![element].concept;
    return robotFrameworkMapping[concept].library;
  }

  private getKeywordForElement(element: string): string {
    const concept = this.processTreeNodes![element].concept;
    return robotFrameworkMapping[concept].keyword;
  }
}

export default RobotFrameworkLinker;
