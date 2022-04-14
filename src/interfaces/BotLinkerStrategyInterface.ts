import IBotModel from "./BotModelInterface";

interface BotLinkerStrategy {
  botModel?: IBotModel;
  linkBot: (botModel: IBotModel) => string;
}

export default BotLinkerStrategy;
