import BotLinker from "src/interfaces/BotLinkerStrategyInterface";
import IBotModel from "src/interfaces/BotModelInterface";
import RobotFrameworkLinker from "./robotFrameworkLinker/RobotFrameworkLinker";

class BotLinkerContext {
  private linker?: BotLinker;

  constructor(linkerName?: string) {
    if (linkerName) {
      this.setLinkerFromString(linkerName);
    }
  }

  public setLinkerFromString(linkerName: String) {
    switch (linkerName.toLowerCase()) {
      case "robotframework":
      case "rf":
        this.setLinker(new RobotFrameworkLinker());
        break;
      default:
        throw new Error("Sorry, " + linkerName + " is not yet supported.");
    }
  }

  public setLinker(linker: BotLinker) {
    this.linker = linker;
  }

  public linkBot(botModel: IBotModel): string {
    if (!this.linker) {
      throw new Error(
        "A linking strategy must be chosen before starting the translation."
      );
    }

    return this.linker.linkBot(botModel);
  }
}

export default BotLinkerContext;
