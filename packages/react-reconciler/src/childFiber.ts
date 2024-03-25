//reconcilerChildren的工厂，毕竟逻辑相同，而且构建子fiber有区别

import { ReactElementType } from "shared/ReactElementTypes";
import { FiberNode } from "./fiber";
import { createFiberWithReactElement } from "./workLoop";
import { REACT_ELEMENT_TYPE } from "shared/ReactSymbol";
import { Placement } from "./fiberFlags";
import { HostText } from "./fiberTag";

//shouldTrackEffects会决定是update还是mount
export function ChildReconciler(shouldTrackEffects: boolean) {
  //闭包策略

  //目前 child可能的type ReactElement    string | number
  //渲染组件
  function reconcilerSingleElement(
    returnFiber: FiberNode,
    currentFirstChild: FiberNode | null,
    element: ReactElementType,
  ) {
    const fiber = createFiberWithReactElement(element);
    fiber.return = returnFiber; //绑定好
    return fiber;
  }

  //渲染纯文字
  function reconcilerSingleTextNode(
    returnFiber: FiberNode,
    currentFirstChild: FiberNode | null,
    textContent: string | number,
  ) {
    const fiber = new FiberNode(
      HostText,
      {
        content: textContent,
      },
      null,
    );
    fiber.return = returnFiber;
    return fiber;
  }

  // plugin
  function placeSingleChild(fiber: FiberNode) {
    //TODO :处理完后的plugin
    if (shouldTrackEffects && fiber.alternate == null) {
      fiber.flags |= Placement;
    }
    return fiber;
  }

  return function reconcileChildFibers(
    workInProgress: FiberNode,
    currentFiber: FiberNode | null,
    childElement: ReactElementType,
  ) {
    //TODO 其他类型的实现
    if (typeof childElement == "object" && childElement != null) {
      if (childElement.$$typeof == REACT_ELEMENT_TYPE) {
        return placeSingleChild(
          reconcilerSingleElement(workInProgress, currentFiber, childElement),
        );
      } else {
        if (__DEV__) {
          console.error("未实现的reconciler类型");
          return null;
        }
      }
    }

    if (typeof childElement == "string" || typeof childElement == "number") {
      return placeSingleChild(
        reconcilerSingleTextNode(workInProgress, currentFiber, childElement),
      );
    }

    if (__DEV__) {
      console.error("未知的childElement类型", childElement);
    }
    return null;
  };
}

export const mountReconcilerChild = ChildReconciler(false);
export const updateReconcilerChild = ChildReconciler(true);
