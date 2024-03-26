//请参考https://kasong.gitee.io/just-react/process/fiber.html#fiber%E7%9A%84%E7%BB%93%E6%9E%84
//React 采用DFS来遍历构成Fiber树，
//reconclier的render阶段会根据fiberNode构建子Fiber
//beginWork为DFS的递阶段 ，completework为DFS的归阶段

import { ElementType, ReactElementType } from "shared/ReactElementTypes";
import { beginWork } from "./beginWork";
import { completeWork } from "./completeWork";
import { FiberNode, createWorkInProgress } from "./fiber";
import { FunctionComponent, HostComponent, HostRoot } from "./fiberTag";
import { Update } from "./updateQueue";
import { FiberRootNode } from "./fiberRoot";

//全局变量，所有函数都能用
let workInProgress: FiberNode | null;

const prepareFreshStack = (root: FiberRootNode) => {
  //用于将当前DFS遍历的位置赋值给workInProgess指针
  workInProgress = createWorkInProgress(root.current, null);
};

export const createFiberWithReactElement = (
  reactElement: ReactElementType,
): FiberNode => {
  const { type, props, key, ref } = reactElement;
  const fiber = new FiberNode(HostComponent, props, key);
  if (typeof type === "string") {
    fiber.tag = HostComponent;
  } else if (typeof type === "function") {
    fiber.tag = FunctionComponent;
  } else {
    if (__DEV__) {
      console.error("未知定义的type类型", reactElement);
    }
  }
  fiber.type = type;
  fiber.key = key;
  fiber.ref = ref;
  return fiber;
};

//Schedule模块
export function Schedule(updateNode: FiberNode) {
  //调度更新的一些处理
  const root = markUpdateFromFiberToRoot(updateNode);
  renderRoot(root);
}

export function markUpdateFromFiberToRoot(
  fiber: FiberNode,
): FiberRootNode {
  let node = fiber;
  let parent = fiber.return;
  while (parent != null) {
    node = parent;
    parent = node.return;
  }
  //如果是null的话代表到达RootFiberNode了
  if (node.tag == HostRoot) {
    return node.stateNode;
  } else {
    //Error: 存在问题
    return node.stateNode;
  }
}

//入口
const renderRoot = (fiberRoot: FiberRootNode) => {
  //一些预先处理,创建workInProgress
  prepareFreshStack(fiberRoot);
  do {
    try {
      workLoop();
      break;
    } catch (e) {
      //异常处理一下
      if (__DEV__) {
        console.warn("render Current: workLoop interupt", e);
      }
    }
  } while (true);

  //处理完后给与finnishWork，准备好渲染
  const finishedWork = fiberRoot.current.alternate;
  fiberRoot.finishedWork = finishedWork;

  //commit阶段
  commitRoot(fiberRoot);
};

//DFS入口

function workLoop() {
  //DFS结束条件为指针为空结束
  while (workInProgress != null) {
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(fiber: FiberNode) {
  //DFS分为三步，先递，再归
  //next 子节点， fiber当前节点

  //next 会一直往下找 直到为null ，然后网上弹，如果有sibling，workInprogress为子节点，又走递归

  //设计思想：1.先一直往下走
  const next = beginWork(fiber);
  //Q:为什么要这样设计？
  fiber.memorizedProps = fiber.pendingProps;

  if (next == null) {
    //走到顶了往上走
    completeUnitWork(fiber);
  } else {
    workInProgress = next;
  }
}

function completeUnitWork(fiber: FiberNode) {
  //遍历到底会全部反弹，直接循环执行
  //设计思想: 中断条件为遍历到顶，如果有sibling，使用return结束
  let node: FiberNode | null;
  node = fiber;
  do {
    //归阶段想完成的事情,指针同步更改
    completeWork(node);
    if (node.sibling) {
      workInProgress = node.sibling;
      return;
    } else {
      node = node.return;
      workInProgress = node;
    }
  } while (node != null);
  //其实为null就已经走出循环了，不需要在定义为null
  workInProgress = null;
}

//commit阶段
export function commitRoot(fiberRoot: FiberRootNode) {}