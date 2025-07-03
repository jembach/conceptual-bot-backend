import BotLinkerStrategy from "../../interfaces/BotLinkerStrategyInterface";
import IBotModel, {
  IProcessTree,
  IProcessTreeNodeInfo,
  IProcessTreeStructure,
} from "../../interfaces/BotModelInterface";
import { flattenContextContainersInProcessTree } from "../../utils/processTreeUtils";
import robotFrameworkMapping from "./robotFrameworkMapping";

class RobotFrameworkLinker implements BotLinkerStrategy {
  readonly indentationCharacter = "  ";
  botModel?: IBotModel;
  processTree?: IProcessTreeStructure;
  processTreeNodes?: Record<string, IProcessTreeNodeInfo>;
  keywords: Record<string, string> = {};

  linkBot(botModel: IBotModel): string {
    this.botModel = botModel;
    let robotLines: string[] = [];

    const parsedProcessTree: IProcessTree = JSON.parse(
      this.botModel.processTree
    );
    const containerFlattenedTree: IProcessTree =
      flattenContextContainersInProcessTree(parsedProcessTree);

    // console.dir(containerFlattenedTree, {
    //   depth: null,
    // });

    this.processTree = containerFlattenedTree.tree;
    this.processTreeNodes = containerFlattenedTree.nodeInfo;

    const settings = this.generateSettingsSection().join("\n");
    const tasks = this.generateTasksSection().join("\n");
    const keywords = this.generateKeywordsSection().join("\n");

    robotLines = robotLines.concat(settings);
    robotLines.push("\n");
    robotLines = robotLines.concat(keywords);
    robotLines.push("\n");
    robotLines = robotLines.concat(tasks);

    return robotLines.join("\n");
  }

  /**
   * Reads the keywords generated during the task section and returns the formatted keyword section.
   *
   * @remarks
   * This method must be executed after generateTasksSection.
   * @returns array of formatted lines
   */
  private generateKeywordsSection(): string[] {
    if (Object.keys(this.keywords).length === 0) {
      return [];
    }

    const keywordsLines: string[] = ["*** Keywords ***"];

    for (const keyword in this.keywords) {
      keywordsLines.push(keyword);
      keywordsLines.push(this.indentationCharacter + this.keywords[keyword]);
    }

    return keywordsLines;
  }

  /**
   * Parses the process tree and build the formatted section of tasks.
   *
   * @returns array of formatted lines
   */
  private generateTasksSection(): string[] {
    let tasksLines = ["*** Tasks ***"];
    tasksLines = tasksLines.concat(
      this.parseProcessTree([this.processTree!], 0)
    );
    return tasksLines;
  }

  /**
   * Creates the settings section of RobotFramework, including libraries
   *
   * @returns array of formatted lines
   */
  private generateSettingsSection(): string[] {
    let settingsLines: string[] = ["*** Settings ***"];

    settingsLines.push("Documentation\t" + this.botModel!.name);

    if (this.botModel!.description) {
      settingsLines.push("...\t" + this.botModel!.description);
    }

    settingsLines = settingsLines.concat(this.getUsedRFLibraries());

    return settingsLines;
  }

  private parseProcessTree(
    processTreeArray: (IProcessTreeStructure | string)[],
    indentation: number,
    generateKeywords: boolean = false
  ): string[] {
    let lines: string[] = [];

    // console.group("New round");

    processTreeArray.forEach((processTreePart) => {
      if (
        typeof processTreePart === "string" ||
        processTreePart instanceof String
      ) {
        console.log("Found leaf " + processTreePart);
        const elementLabel = this.getLabelForElement(processTreePart as string);

        if (generateKeywords) {
          this.keywords[elementLabel] = this.getKeywordForElement(
            processTreePart as string
          );
          lines.push(
            this.indentationCharacter.repeat(indentation) + elementLabel
          );
        } else {
          lines.push(
            this.indentationCharacter.repeat(indentation) + elementLabel
          );
          lines.push(
            this.indentationCharacter.repeat(indentation + 1) +
              this.getKeywordForElement(processTreePart as string)
          );
        }

        return;
      }

      for (const subProcessTreeKey in processTreePart) {
        console.log("we have a " + subProcessTreeKey);
        if (subProcessTreeKey.includes("Gateway")) {
          lines.push(
            this.indentationCharacter.repeat(indentation) +
              this.getLabelForElement(subProcessTreeKey)
          );
          lines = lines.concat(
            this.parseDecision(
              processTreePart[subProcessTreeKey],
              indentation + 1
            )
          );
        } else {
          lines = lines.concat(
            this.parseProcessTree(
              processTreePart[subProcessTreeKey],
              indentation,
              generateKeywords
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
        this.parseProcessTree([processTree], indentation + 1, true)
      );
      lines.push(this.indentationCharacter.repeat(indentation) + "ELSE IF");
    });
    lines.pop();
    lines.push(this.indentationCharacter.repeat(indentation) + "END");
    return lines;
  }

  /**
   * Analyzes the node infos of the process tree and creates the formatted library section.
   *
   * @returns array of formatted lines
   */
  private getUsedRFLibraries(): string[] {
    const usedLibraries: string[] = [];

    const setOfLibraries: Set<string> = new Set();

    for (const node in this.processTreeNodes) {
      try {
        const libraryOfNode = this.getLibraryForElement(node);
        if (libraryOfNode) {
          setOfLibraries.add(libraryOfNode);
        }
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

  private getLabelForElement(element: string): string {
    return this.processTreeNodes![element].label;
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
