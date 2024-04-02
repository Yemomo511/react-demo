import { Container } from "hostConfig";
import { FiberRootNode } from "./fiberRoot";
import { HostRoot } from "./fiberTag";
import { FiberNode } from "./fiber";
import {
  Update,
  UpdateQueue,
  createUpdate,
  createUpdateQueue,
  enqueueUpdate,
} from "./updateQueue";
import { ReactElementType } from "shared/ReactElementTypes";
import { ScheduleUpdateOnFiber } from "./workLoop";

//调度更新入口函数，供react-dom使用！！！，其它接口请不要暴露

export const createContainer = (container: Container): FiberRootNode => {
  //Root 初始化
  const fiberRoot = new FiberNode(HostRoot, {}, null);
  const root = new FiberRootNode(container, fiberRoot);
  //处理更新
  fiberRoot.updateQueue = createUpdateQueue();
  return root;
};

export const updateContainer = (
  element: ReactElementType,
  root: FiberRootNode,
) => {
  //触发schedule
  const rootCurrent = root.current;
  const update = createUpdate<ReactElementType>(element);
  enqueueUpdate(
    update,
    rootCurrent.updateQueue as UpdateQueue<ReactElementType>,
  );
  ScheduleUpdateOnFiber(rootCurrent);
};
