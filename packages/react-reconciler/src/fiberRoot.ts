import { FiberNode } from "./fiber";
import { Container } from "../../react-dom/src/hostConfig";

/**
 *
 * container: 这是一个DOM节点，它是React应用挂载的地方。所有的React组件都会被渲染为这个容器的子节点。
 *
 * current: 这是一个指向当前正在显示的Fiber树的指针。当React需要进行更新时，它会创建一个新的Fiber树，并且在完成更新后，将current指针指向新的Fiber树。
 *
 * finishedWork: 这是一个指向已经完成但还没有提交的工作的指针。当React完成一次更新后，它会将完成的工作存储在finishedWork中，等待合适的时机进行提交（即更新DOM）。
 */

export class FiberRootNode {
  container: Container;
  current: FiberNode;
  finishedWork: FiberNode | null;
  //初始化FiberRootNode,绑定一下current
  constructor(container: Container, hostRootFiber: FiberNode) {
    //current绑定Fiber树的根节点
    this.current = hostRootFiber;
    this.container = container;
    hostRootFiber.stateNode = this;
    this.finishedWork = null;
  }
}
