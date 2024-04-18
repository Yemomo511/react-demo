import { Container } from "hostConfig";
import {
  createContainer,
  updateContainer,
} from "react-reconciler/src/fiberReconciler";
import { renderRoot } from "react-reconciler/src/workLoop";
import { ReactElementType } from "shared/ReactElementTypes";
import { initEvent } from "./SyntheticEvent";
export const createRoot = (container: Container) => {
  const root = createContainer(container);
  return {
    render(element: ReactElementType) {
      initEvent(container, "click");
      //触发更新
      updateContainer(element, root);
    },
  };
};
