//Fiber的组件类型

export type FiberTag =
  | typeof FunctionComponent
  | typeof ClassComponent
  | typeof HostRoot
  | typeof HostText
  | typeof HostComponent;

export const FunctionComponent = 0;
export const ClassComponent = 1;
//Root of a host tree. Could be nested inside another node.
export const HostRoot = 2;
export const HostText = 3;
//  A DOM element.
export const HostComponent = 4;
