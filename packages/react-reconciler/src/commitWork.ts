import { Container, appendChildToContainer } from "hostConfig";
import { FiberNode } from "./fiber";
import { MutationMask, NoFlags, Placement } from "./fiberFlags";
import { HostComponent, HostRoot, HostText } from "./fiberTag";
import { FiberRootNode } from "./fiberRoot";

let nextEffect: FiberNode | null = null;

export const beforeMutationCommit = () => {};

export const commitMutationEffects = (finishedWork: FiberNode) => {
  nextEffect = finishedWork;

  //DFS遍历，寻找所有的突变点，和先递后归原理一样
  while (nextEffect !== null) {
    let isSibling = false;
    //找根节点,由于冒泡flags分subtreeFlags和自己的flags
    if (
      nextEffect.child !== null &&
      (nextEffect.subtreeFlags & MutationMask) != NoFlags
    ) {
      nextEffect = nextEffect.child;
    } else {
      //找到了根发生突变的节点,由于可能是child或者sibling的flag，因此一并处理
      //从下到上依次将子statenode绑定给父statenode
      // TODO: 推到根节点退出，hostRoot目前不处理，因为没有
      while (nextEffect != null && !isSibling && nextEffect.tag != HostRoot) {
        commitMutationEffectsOnFiber(nextEffect);
        if (nextEffect.sibling != null) {
          nextEffect = nextEffect.sibling;
          isSibling = true;
          console.log("sibling")
        } else {
          nextEffect = nextEffect.return;
        }
      }
      if (nextEffect != null && nextEffect.tag == HostRoot) {
        nextEffect = null;
      }
      
    }
  }
};

const commitMutationEffectsOnFiber = (finishedFiber: FiberNode) => {
  //根据Type进行不同的flags处理,相当于流水线式处理
  if ((finishedFiber.flags & Placement) != NoFlags) {
    handlePlacementFlag(finishedFiber);
    //对Placement的二进制取反执行按位与，Placement位会变成0
    finishedFiber.flags &= ~Placement;
  }
  return;
};

//处理placementFlag
const handlePlacementFlag = (finishedFiber: FiberNode) => {
  if (__DEV__) {
    console.log("handle placement flag");
  }
  //获取父container，将节点放进container
  const hostParent = getHostParent(finishedFiber);
  if (hostParent != null) {
    appendPlacementNodeInContainer(finishedFiber, hostParent);
  }
};

const getHostParent = (fiber: FiberNode) => {
  let parent = fiber.return;
  //找根HostComponent
  while (parent) {
    if (parent.tag == HostComponent) {
      return parent.stateNode as Container;
    }
    if (parent.tag == HostRoot) {
      return (parent.stateNode as FiberRootNode).container;
    }
    parent = parent.return;
  }
  if (__DEV__) {
    console.error(fiber);
    console.error("Commit 未找到parentHost");
  }
  return null;
};

//这个节点下面所有的关于host的添加到他parentContainer中
const appendPlacementNodeInContainer = (
  finishedFiber: FiberNode,
  parent: Container,
) => {
  //TODO: 递归处理，因为冒泡，所以需要递归添加
  const tag = finishedFiber.tag;
  if (tag == HostComponent || tag === HostText) {
    appendChildToContainer(parent, finishedFiber.stateNode);
    return;
  }
  const child = finishedFiber.child;
  if (child != null) {
    appendPlacementNodeInContainer(child, parent);
    let sibling = child.sibling;
    while (sibling !== null) {
      appendPlacementNodeInContainer(sibling, parent);
      sibling = sibling.sibling;
    }
  }
};
