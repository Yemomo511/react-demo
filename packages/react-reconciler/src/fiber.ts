//定义fiber结构

import { ElementType, Key, Props, ReactElementType, Ref } from "shared/ReactElementTypes";
import { Flags, NoFlags } from "./fiberFlags";
import { FiberTag, FunctionComponent, HostComponent } from "./fiberTag";

export class FiberNode {
  // 对于 FunctionComponent，指函数本身()=>{}这种,对于ClassComponent，指class，对于HostComponent，指DOM节点tagName
  type: ElementType;
  // Fiber对应组件的类型 Function/Class/Host...
  tag: FiberTag;
  pendingProps: Props; //更改的属性
  key: Key;
  stateNode: any; //真实dom
  ref: Ref;

  //节点定义，详细参考Fiber树
  return: FiberNode | null;
  child: FiberNode | null;
  sibling: FiberNode | null;
  index: number; //标注兄弟元素中排名多少

  //update的标注
  subtreeFlags: Flags;
  flags: Flags;
  memorizedProps: Props;
  memorizedState: any; // memorizedState有很多情况
  alternate: FiberNode | null;
  //TODO: 后期再实现
  //参考https://kasong.gitee.io/just-react/state/update.html#updatequeue
  updateQueue: unknown;

  //优先级相关,后期标注为Lane
  lanes: any;
  //要删除的Fiber
  deletion: FiberNode[] | null;

  //构造时有type props key
  constructor(tag: FiberTag, pendingProps: Props, key: Key) {
    this.tag = tag;
    this.key = key;
    this.stateNode = null;
    this.type = null;

    //节点构成
    this.return = null;
    this.sibling = null;
    this.child = null;
    this.index = 0;

    this.ref = null;

    //工作单元
    this.pendingProps = pendingProps;
    this.memorizedProps = null;

    //对应的current，互相链接
    this.alternate = null;

    //副作用，确定本次更新该干什么
    this.flags = NoFlags;
    this.subtreeFlags = NoFlags;
    this.lanes = null;
    this.deletion = null;
  }
}

//Fiber的双渲染机制，要么mount 要么update
//PINK: 先复制current，再根据pendingProps修改

//创建工作树，然后交给render和commit，分别制造子节点和进行更新字段
//请参考https://kasong.gitee.io/just-react/process/doubleBuffer.html#%E4%BB%80%E4%B9%88%E6%98%AF-%E5%8F%8C%E7%BC%93%E5%AD%98
export function createWorkInProgress(current: FiberNode, pendingProps: Props) {
  // PINK: 通过current.alternate判断
  // 过程: 1. 首次渲染时，只有一个RootFiber ,只能手工制造一个RootFiber，并使用alternate进行根绑定
  // 然后: 2. 更新时，由于上次的alternate没有解绑，代表至少完成过mount，即现在是update阶段，判断alternate是否存在，存在的话
  //         第二次构建的 workInprogress 的 rootFiber 复用部分 上一次的current, 并初始化一些操作
  //         例如副作用清空，传入新的props准备diff，然后交给render 走 DFS 构建剩下的 Fiber
  //
  //获取是否alternate，如果有update没有为mount首屏渲染
  let wip = current.alternate;
  if (wip == null) {
    wip = new FiberNode(current.tag, pendingProps, current.key);
    wip.stateNode = current.stateNode;

    //初始化绑定
    wip.alternate = current;
    current.alternate = wip;
  } else {
    //update 初始化一下wip
    wip.pendingProps = pendingProps;
    wip.flags = NoFlags;
    wip.subtreeFlags = NoFlags;
  }
  //相当于把current复制给wip了
  wip.type = current.type;
  wip.key = current.key;
  wip.stateNode = current.stateNode;
  wip.ref = current.ref;
  wip.memorizedProps = current.memorizedProps;
  wip.memorizedState = current.memorizedState
  wip.child = current.child;
  wip.index = current.index;
  wip.updateQueue = current.updateQueue;
  console.log("wip", wip);
  return wip;
}

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