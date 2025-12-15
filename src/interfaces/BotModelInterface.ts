export enum BotModelType {
  BOT = "Bot",
  FACADE = "Facade",
  TEMPLATE_METHOD = "TemplateMethod",
  DECORATOR = "Decorator",
  PROXY = "Proxy",
  CHAIN_OF_RESPONSIBILITY = "ChainOfResponsibility",
}

export interface IInjectionPoint {
  id: string;
  label: string;
  accessedData: IBotAccessedData[];
}

export interface IBotModel {
  name: string;
  description?: string;
  type?: BotModelType;
  model: string;
  processTree: string;
  accessedData?: IBotAccessedData[];
  injectionPoints?: IInjectionPoint[];
}

export interface IBotAccessedData extends IRpaBaseElement {
  concept: IRpaBaseElement;
}

export interface IRpaBaseElement {
  id: string;
  iri: string;
  label?: string;
  comment?: string;
  type?: IRpaBaseElement;
}

export interface IProcessTreeNodeInfo {
  label: string;
  concept: string;
}
export type IProcessTreeStructure = Record<
  string,
  (string | IProcessTreeStructure)[]
>;

export interface IProcessTree {
  tree: IProcessTreeStructure;
  nodeInfo: Record<string, IProcessTreeNodeInfo>;
}

export default IBotModel;
