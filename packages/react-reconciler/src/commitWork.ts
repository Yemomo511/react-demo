import {
  Container,
  appendChildToContainer,
  commitUpdate,
  removeChild,
} from "hostConfig";
import { FiberNode } from "./fiber";
import {
  Deletion,
  MutationMask,
  NoFlags,
  Placement,
  Update,
} from "./fiberFlags";
import {
  FunctionComponent,
  HostComponent,
  HostRoot,
  HostText,
} from "./fiberTag";
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
          console.log("sibling连接到父节点");
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
  if ((finishedFiber.flags & Update) != NoFlags) {
    console.log("update");
    commitUpdate(finishedFiber);
    finishedFiber.flags &= ~Update;
  }
  if ((finishedFiber.flags & Deletion) != NoFlags) {
    handleDeletionFlag(finishedFiber);
    finishedFiber.flags &= ~Deletion;
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

//处理DeletionFlag
const handleDeletionFlag = (finishedFiber: FiberNode) => {
  if (__DEV__) {
    console.log("handle deletion flag");
  }
  const deleteFiber = finishedFiber.deletion;
  if (Array.isArray(deleteFiber)) {
    deleteFiber.forEach((deleteFiber) => {
      //找到要删除的Fiber，需要递归子树，因为冒泡的原因
      CommitDeletion(deleteFiber);
    });
  }
  finishedFiber.deletion = null;
  finishedFiber.flags &= ~Deletion;
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

const CommitDeletion = (childFiber: FiberNode) => {
  let rootHostNode: FiberNode | null = null;
  commitNestedComponent(childFiber, (unmountFiber): boolean => {
    switch (unmountFiber.tag) {
      case HostComponent:
        if (rootHostNode == null) {
          rootHostNode = unmountFiber;
          return true;
        }
        return false;
      case HostText:
        if (rootHostNode == null) {
          rootHostNode = unmountFiber;
          return true;
        }
        return false;
      case FunctionComponent:
        //一些解除ref，副作用卸载的操作
        return false;
      default:
        return false;
    }
  });
  if (rootHostNode != null) {
    const parent = getHostParent(childFiber);
    if (parent != null) {
      //删除节点
      removeChild(parent, (rootHostNode as FiberNode).stateNode);
    }
  }
  childFiber.return = null;
  childFiber.child = null;
};

const commitNestedComponent = (
  root: FiberNode,
  commitChildFn: (unmountFiber: FiberNode) => boolean,
) => {
  let node = root;
  while (true) {
    const isFindRoot = commitChildFn(node);
    if (isFindRoot) {
      return;
    }
    if (node.child != null) {
      node = node.child;
      continue;
    }
    if (node == root) {
      return;
    }
    while (node.sibling === null) {
      if (node.return === null || node.return === root) {
        return;
      }
      node = node.return;
    }

    node.sibling.return = node.return;
    node = node.sibling;
  }
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
