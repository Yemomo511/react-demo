//reconcilerChildren的工厂，毕竟逻辑相同，而且构建子fiber有区别

import { ReactElementType } from "shared/ReactElementTypes";
import { FiberNode } from "./fiber";
import { createFiberWithReactElement } from "./fiber";
import { REACT_ELEMENT_TYPE } from "shared/ReactSymbol";
import { Placement } from "./fiberFlags";
import { HostText } from "./fiberTag";
import { isArray } from "lodash";

//shouldTrackEffects会决定是update还是mount
//TODO: 根据current进行复用渲染，可以使用diff算法
export function ChildReconciler(shouldTrackEffects: boolean) {
  //闭包策略

  //目前 child可能的type ReactElement    string | number | function
  //ps 对于函数式组件 ，type为()=>{}，child需要通过运行type才能获取，jsx规定所致
  //因此创造fiber时没有child，需要创造functionComponent时会运行type获取child
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

  //渲染多child
  function reconcilerMultiChildren(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    childArray: Array<any>,
  ) {
    //TODO:  child有可能多种类型,这里也需要进行判断对不同的child进行处理
    //例如
    /**
     * <div>aaa<span>bbb</span></div> aaa为String类型，<span></span>为ElementType
     */
    const fiber = createFiberWithReactElement(childArray[0]);
    let siblingFiber = fiber;
    fiber.return = returnFiber;
    placeSingleChild(fiber);
    for (let index = 1; index < childArray.length; index++) {
      siblingFiber.sibling = createFiberWithReactElement(childArray[index]);
      siblingFiber.sibling.return = returnFiber;
      placeSingleChild(siblingFiber.sibling);
      siblingFiber = siblingFiber.sibling;
    }
    return fiber;
  }

  // plugin
  // mount时只会在rootFiber存在Placement effectTag
  function placeSingleChild(fiber: FiberNode) {
    //TODO :处理完后的plugin
    // console.log(fiber.flags, fiber.type);
    if (shouldTrackEffects && fiber.alternate == null) {
      fiber.flags |= Placement;
    }
    return fiber;
  }

  return function reconcileChildFibers(
    workInProgress: FiberNode,
    currentFiber: FiberNode | null,
    childElement: ReactElementType | string | number,
  ) {
    //TODO 其他类型的实现
    console.log("childElement", childElement);
    if (
      typeof childElement == "object" &&
      childElement != null &&
      Array.isArray(childElement) == false
    ) {
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

    if (typeof childElement == "object" && Array.isArray(childElement)) {
      if (childElement.length == 0) {
        return null;
      }

      return reconcilerMultiChildren(workInProgress, currentFiber, childElement)
    }

    if (__DEV__) {
      console.error("未知的childElement类型", childElement);
    }
    return null;
  };
}

export const mountReconcilerChild = ChildReconciler(false);
export const updateReconcilerChild = ChildReconciler(true);
