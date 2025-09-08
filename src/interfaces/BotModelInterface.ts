export enum BotModelType {
  BOT = "bot",
  MODULE = "module",
  TEMPLATE = "template",
  DECORATOR = "decorator",
}

interface IBotModel {
  name: string;
  description?: string;
  type?: BotModelType;
  model: string;
  processTree: string;
  accessedData?: IBotAccessesedData[];
  templatePlaceholders?: { type: string }[];
}

interface IBotAccessesedData extends IRpaBaseElement {
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
