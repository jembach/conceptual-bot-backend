import BotLinker from "src/interfaces/BotLinkerStrategyInterface";
import IBotModel from "src/interfaces/BotModelInterface";

class RobotFrameworkLinker implements BotLinker {
  linkBot(botModel: IBotModel): string {
    return "";
  }
}

export default RobotFrameworkLinker;
