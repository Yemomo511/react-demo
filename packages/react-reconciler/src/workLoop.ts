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
import { NoFlags } from "./fiberFlags";
import { beforeMutationCommit, commitMutationEffects } from "./commitWork";

//全局变量，所有函数都能用
let workInProgress: FiberNode | null;

const prepareFreshStack = (root: FiberRootNode) => {
  //用于将当前DFS遍历的位置赋值给workInProgess指针
  workInProgress = createWorkInProgress(root.current, null);
};



//Schedule模块
export function ScheduleUpdateOnFiber(updateNode: FiberNode) {
  //调度更新的一些处理
  const root = markUpdateFromFiberToRoot(updateNode);
  renderRoot(root);
}

export function markUpdateFromFiberToRoot(fiber: FiberNode) {
  let node = fiber;
  let parent = node.return;
  while (parent != null) {
    node = parent;
    parent = node.return;
  }
  //如果是null的话代表到达RootFiberNode了
  if (node.tag == HostRoot) {
    return node.stateNode;
  } else {
    //Error: 存在问题
    console.error("未找到RootFiberNode");
    return null;
  }
}

//入口
export const renderRoot = (fiberRoot: FiberRootNode) => {
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
        return;
      }
      break;
    }
  } while (true);

  //处理完后给与finnishWork，准备好渲染
  //fiberRoot.current.alternate 为本次构建的wip
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
  return;
}

export function performUnitOfWork(fiber: FiberNode) {
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
    console.log("complete",node)
    //归阶段想完成的事情,指针同步更改,不需要对wip进行递归，这是处理文件
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
export function commitRoot(fiberRoot: FiberRootNode) {
  //fiberRoot.finishWork 为 render阶段的wip
  const finishedWork = fiberRoot.finishedWork;
  console.log(finishedWork);
  if (finishedWork == null) {
    return;
  }
  if (__DEV__) {
    console.warn("开始commit阶段");
  }
  /**
   * commit 三个阶段
   * before mutation
   * mutation
   * layout
   */

  //before mutation之前 完成一些属性的提取和重置，
  fiberRoot.finishedWork == null;
  //判断副作用,由于flags冒泡，所有flags已经冒泡到顶部
  const isHasSubFlags = finishedWork.subtreeFlags !== NoFlags;
  const isHasFlags = finishedWork.flags !== NoFlags;

  if (isHasFlags || isHasSubFlags) {
    //开启commit的三个阶段
    console.log("进入commit")
    //第一阶段
    beforeMutationCommit();
    commitMutationEffects(finishedWork);
  } else {
    //layout,切换到wip
    fiberRoot.current = finishedWork;
  }
}

//https://react.iamkasong.com/renderer/beforeMutation.html#%E6%A6%82%E8%A7%88
