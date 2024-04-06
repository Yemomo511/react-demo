import { FiberNode } from "./fiber";

//begin阶段处理
export const renderWithHooks = (wip: FiberNode) => {
  //Function Component的type为()=>{},可以直接把props传递，会返回对应的ReactElement
  const FunctionComponent = wip.type;
  const props = wip.pendingProps;
  const children = FunctionComponent(props);

  return children;
};
