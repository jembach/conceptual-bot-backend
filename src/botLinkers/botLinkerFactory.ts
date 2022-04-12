import BotLinker from "src/interfaces/BotLinkerStrategyInterface";
import RobotFrameworkLinker from "./robotFrameworkLinker/robotFrameworkLinker";

export enum Linker {
    RobotFrameworkLinker;
}


class BotLinkerFactory {
    private linker: BotLinker | undefined = undefined;

    setLinker(linker: BotLinker) {

    }
}