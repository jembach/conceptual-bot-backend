interface IBotModel {
  name: string;
  description?: string;
  model: string;
  processTree: string;
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
