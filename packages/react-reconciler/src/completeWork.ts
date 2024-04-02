import { FiberNode } from "./fiber";
import { NoFlags } from "./fiberFlags";
import {
  ClassComponent,
  FunctionComponent,
  HostComponent,
  HostRoot,
  HostText,
} from "./fiberTag";
import {
  Container,
  Instance,
  appendInitialChild,
  createInstance,
  createTextInstance,
} from "hostConfig";

//completeWork的设计理念请参考https://kasong.gitee.io/just-react/process/completeWork.html

//completeWork需要完成
export const completeWork = (wip: FiberNode) => {
  //归阶段，完成一些事情
  const newProps = wip.pendingProps;
  const current = wip.alternate;
  switch (wip.tag) {
    case FunctionComponent:
    case ClassComponent:
    case HostText:
      // Host Text 绝对的最底部，不存在child，不需要appendAllChildren来
      // 将节点冒泡
      if (current != null && wip.stateNode != null) {
        //走 update阶段
      }else{
        const instance = createTextInstance(newProps.content);
        wip.stateNode = instance;
      }
      bubbleProperties(wip);
      return;
    case HostRoot:
      bubbleProperties(wip);
      return;
    case HostComponent:
      //判断是否存在dom
      /**
       * wip.stateNode = dom;是将新创建的DOM元素赋值给wip，
       * 而appendInitialChild(dom, wip);是将wip的子节点添加到这个DOM元素上。
       * 这两步操作都是必要的，因为它们分别完成了DOM元素的创建和子元素的添加。
       */
      if (current != null && wip.stateNode != null) {
        //update逻辑
      } else {
        //1. 构建dom 一个dom标签和其props就可以构建了，其他的暂时不用，ref也暂时不考虑
        const instance = createInstance(wip.type, newProps);
        //2. 将dom 插入到当前的 dom树中
        appendAllChildren(instance, wip);
        wip.stateNode = instance;
      }
      //事件冒泡,将子事件的flags冒泡到父组件上
      bubbleProperties(wip);
      return;
    default:
      if (__DEV__) {
        console.error("未知的tag类型", wip.tag);
      }
      break;
  }
  return;
};

const bubbleProperties = (wip: FiberNode) => {
  let bubbleNode = wip.child;
  let subTreeFlags = NoFlags;

  while (bubbleNode != null) {
    //子孙全部冒泡并全部绑定
    subTreeFlags |= bubbleNode.flags;
    subTreeFlags |= bubbleNode.subtreeFlags;

    bubbleNode.return = wip;
    //子孙节点的flags全部冒泡
    bubbleNode = bubbleNode.sibling;
  }
  wip.subtreeFlags |= subTreeFlags;
};

/***
 * 原因就在于completeWork中的appendAllChildren方法。
 * 由于completeWork属于“归”阶段调用的函数，
 * 每次调用appendAllChildren时都会将已生成的子孙DOM节点插入当前生成的DOM节点下。
 * 那么当“归”到rootFiber时，我们已经有一个构建好的离屏DOM树
 */

//parent当前的DOM节点
//Study: 这个函数逻辑很优秀
function appendAllChildren(parent: Container | Instance, wip: FiberNode) {
  let node = wip.child;
  while (node != null) {
    //对于 HostComponent 和 HostText 在归过程中stateNode一直更新，因此不需要找其child，因为已经通过归阶段一步步放到
    //顶部节点了
    //而对于子节点非HostComponent就递归往下找，如果找到HostComponent，再冒泡往上走，并每次走的时候都把sibling都处理好return绑定到children的return
    if (node.tag == HostComponent || node.tag == HostText) {
      appendInitialChild(parent, node.stateNode);
    } else if (node.child != null) {
      node.child.return = node;
      node = node.child;
      continue;
    }

    if (node === wip) {
      return;
    }

    //对多余的其他兄弟节点进行处理
    while (node.sibling === null) {
      if (node.return == null || node.return == wip) {
        return;
      }
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
