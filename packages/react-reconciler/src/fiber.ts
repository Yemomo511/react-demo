//定义fiber结构

import { ElementType, Key, Props, Ref } from "shared/ReactElementTypes";
import { Flags, NoFlags } from "./fiberFlags";
import { FiberTag } from "./fiberTag";

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
  flags: Flags ;
  memorizedProps: Props;
  memorizedState: any; // memorizedState有很多情况
  alternate: FiberNode | null;
  //TODO: 后期再实现 
  //参考https://kasong.gitee.io/just-react/state/update.html#updatequeue
  updateQueue: unknown;

  //优先级相关,后期标注为Lane
  lanes: any;

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
  }
}

//Fiber的双渲染机制，要么mount 要么update
//PINK: 先复制current，再根据pendingProps修改

//创建工作树，然后交给render和commit，分别制造子节点和进行更新字段
//请参考https://kasong.gitee.io/just-react/process/doubleBuffer.html#%E4%BB%80%E4%B9%88%E6%98%AF-%E5%8F%8C%E7%BC%93%E5%AD%98
export function createWorkInProgress(current: FiberNode, pendingProps: Props) {
  //获取是否alternate，如果有update没有为mount首屏渲染
  let wip = current.alternate;
  if (wip == null) {
    wip = new FiberNode(current.tag, pendingProps, current.key);
    // wip.flags = null
  } else {
    //update 初始化一下wip
    wip.pendingProps = pendingProps
    wip.flags = NoFlags;
    wip.subtreeFlags = NoFlags;
  }
  wip.type = current.type;
  wip.key = current.key;
  wip.stateNode = current.stateNode;
  wip.ref = current.ref;
  wip.memorizedProps = current.memorizedProps;
  wip.child = current.child;
  wip.index = current.index;

  //保险起见，绑定一下
  wip.alternate = current;
  current.alternate = wip;
  return wip
}
