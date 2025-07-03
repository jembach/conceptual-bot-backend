import {
  IProcessTree,
  IProcessTreeStructure,
} from "../interfaces/BotModelInterface";
import { RpaContextContainer, RpaOperation } from "../interfaces/RpaOperation";
import { rpaContextContainers } from "./ontologyParser";

export function flattenContextContainersInProcessTree(
  processTree: IProcessTree
): IProcessTree {
  const tree = processTree.tree;
  const nodeInfo = processTree.nodeInfo;

  const flattenedTree = flattenProcessTreePart([tree]);

  return {
    tree: flattenedTree[0] as IProcessTreeStructure,
    nodeInfo: nodeInfo,
  };

  function flattenProcessTreePart(
    processTreeArray: (IProcessTreeStructure | string)[]
  ): (IProcessTreeStructure | string)[] {
    const flattenedProcessTrees: (IProcessTreeStructure | string)[] = [];

    processTreeArray.forEach((processTreePart) => {
      if (
        typeof processTreePart === "string" ||
        processTreePart instanceof String
      ) {
        flattenedProcessTrees.push(processTreePart);

        return;
      }

      for (const subProcessTreeKey in processTreePart) {
        if (getConceptOfNode(subProcessTreeKey) in rpaContextContainers) {
          let flattenedContainerTree: (IProcessTreeStructure | string)[] = [];

          const contextContainer: RpaContextContainer =
            rpaContextContainers[getConceptOfNode(subProcessTreeKey)];

          delete nodeInfo[subProcessTreeKey];

          contextContainer.setupSteps.forEach((setupOperation) => {
            const setupStepKeyInProcess =
              subProcessTreeKey + "_" + setupOperation.id;
            flattenedContainerTree.push(setupStepKeyInProcess);
            nodeInfo[setupStepKeyInProcess] = {
              label: setupOperation.id,
              concept: setupOperation.id,
            };
          });
          flattenedContainerTree = flattenedContainerTree.concat(
            processTreePart[subProcessTreeKey]
          );
          contextContainer.cleanupSteps.forEach((cleanupOperation) => {
            const cleanupStepKeyInProcess =
              subProcessTreeKey + "_" + cleanupOperation.id;
            flattenedContainerTree.push(cleanupStepKeyInProcess);
            nodeInfo[cleanupStepKeyInProcess] = {
              label: cleanupOperation.id,
              concept: cleanupOperation.id,
            };
          });
          const flattenedSubProcessTree: IProcessTreeStructure = {};
          flattenedSubProcessTree["Flow"] = flattenedContainerTree;
          flattenedProcessTrees.push(flattenedSubProcessTree);
        } else {
          const flattenedSubProcessTree: IProcessTreeStructure = {};
          flattenedSubProcessTree[subProcessTreeKey] = flattenProcessTreePart(
            processTreePart[subProcessTreeKey]
          );
          flattenedProcessTrees.push(flattenedSubProcessTree);
        }
      }
    });
    return flattenedProcessTrees;
  }
  function getConceptOfNode(node: string): string {
    if (!(node in nodeInfo)) {
      return "";
    }
    return nodeInfo[node].concept;
  }
}
