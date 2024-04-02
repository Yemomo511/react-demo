import { Container } from "hostConfig";
import { createContainer, updateContainer } from "react-reconciler/src/fiberReconciler";
import { renderRoot } from "react-reconciler/src/workLoop";
import { ReactElementType } from "shared/ReactElementTypes";
export const createRoot = (container: Container) => {
  console.log(container,"createRoot")
  const root = createContainer(container);
  return {
    render(element: ReactElementType) {
      //触发更新
      updateContainer(element, root);
    },
  };
};
