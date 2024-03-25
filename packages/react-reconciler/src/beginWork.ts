import { ReactElementType } from "shared/ReactElementTypes";
import { FiberNode } from "./fiber";
import {
  ClassComponent,
  FunctionComponent,
  HostComponent,
  HostRoot,
} from "./fiberTag";
import { UpdateQueue, processUpdateQueue } from "./updateQueue";
import { mountReconcilerChild, updateReconcilerChild } from "./childFiber";
//Diff算法会比较ReactElement来构造本次的fiber，并打上flag，具体的应该在completework执行

//begin的所有阶段请参考https://kasong.gitee.io/just-react/process/beginWork.html#effecttag
export const beginWork = (wip: FiberNode) => {
  //初始化等
  //1.判断是否可以复用，待实现

  //2.根据tag区分要如何处理
  switch (wip.tag) {
    case FunctionComponent:
      return updateClassComponent(wip);

    case ClassComponent:
      return updateFunctionComponent(wip);

    case HostRoot:
      return updateHostRoot(wip);

    case HostComponent:
      return updateHostComponent(wip);

    default:
      if (__DEV__) {
        console.error("beginWork: 没有与之匹配的tag");
      }
      break;
  }

  //最后要返回子节点
  return null;
};
/**
 * 在React的Fiber架构中，updateQueue主要用于存储组件状态的更新。当你在一个类组件或函数组件中调用setState或forceUpdate时，
 * React会创建一个更新（Update）并将它添加到updateQueue中。
 * 然而，HostComponent是代表真实DOM元素的Fiber节点，它们不具有自己的状态。
 * 因此，HostComponent节点没有updateQueue，也就不需要处理updateQueue
 */
export function updateFunctionComponent(wip: FiberNode) {
  return null;
}

export function updateClassComponent(wip: FiberNode) {
  return null;
}

export function updateHostRoot(wip: FiberNode) {
  //采用reducer策略
  const memorizeState = wip.memorizedState;
  //每一个更新都涉及到Element的更新
  const update = wip.updateQueue as UpdateQueue<Element>;
  const pending = update.share.pending;
  update.share.pending = null;
  const { memorized: updateState } = processUpdateQueue(memorizeState, pending);
  wip.memorizedState = updateState;

  //获取下一个Element，准备转化为Fiber
  const nextChild = wip.memorizedState;
  reconcilerChildren(wip, nextChild);

  //准备更新

  return wip.child;
}

export function updateHostComponent(wip: FiberNode) {
  //区分好！！！别弄混
  //wip.child 是子fiber 他的子ReactElement在props上面的child , jsx转化的时候就这么处理
  const nextProps = wip.pendingProps;
  const nextChild = nextProps.child;
  reconcilerChildren(wip, nextChild);
  return wip.child;
}

//构建child 子fiber节点
export function reconcilerChildren(wip: FiberNode, children: ReactElementType) {
  const current = wip.alternate;
  //把ReactElement转化为Fiber并绑定到wip上
  if (current != null) {
    //update机制
    wip.child = updateReconcilerChild(wip, current.child, children);
  } else {
    // mount机制
    wip.child = mountReconcilerChild(wip, null, children);
  }
}
