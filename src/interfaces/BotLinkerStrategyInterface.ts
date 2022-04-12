import IBotModel from "./BotModelInterface";

interface BotLinkerStrategy {
  linkBot: (botModel: IBotModel) => string;
}

export default BotLinkerStrategy;
