import { Dispatch, Dispatcher } from "react/src/currentDispatcher";
import { FiberNode } from "./fiber";
import {
  UpdateQueue,
  createUpdate,
  createUpdateQueue,
  enqueueUpdate,
} from "./updateQueue";
import { Action } from "shared/ReactElementTypes";
import { ScheduleUpdateOnFiber } from "./workLoop";
import internals from "shared/intervals";

interface Hook {
  memoizedState: any;
  updateQueue: unknown;
  next: Hook | null;
}

let currentlyRenderingFiber: FiberNode | null = null;
let workInProgressHook: Hook | null = null;
console.log(internals)
const currentDispatcher = internals.currentDispatcher

//begin阶段处理
export const renderWithHooks = (wip: FiberNode) => {
  //hook 处理
  currentlyRenderingFiber = wip;
  //当前wip重置，准备处理后返回
  wip.memorizedState = null;

  const current = wip.alternate;

  if (current != null) {
    //current可以帮助是否有滞留更新，并合并到当前wip上
    //TODO: update处理
  } else {
    //在运行函数前，设置当前的hook,函数会运行这些玩意
    currentDispatcher.current = HookDispatcherOnMount;
  }

  //Function Component的type为()=>{},可以直接把props传递，会返回对应的ReactElement
  const FunctionComponent = wip.type;
  const props = wip.pendingProps;
  console.log(currentDispatcher)
  const children = FunctionComponent(props);
  //函数组件及时清理，保证hook调用是在函数式组件调用
  currentlyRenderingFiber = null;

  return children;
};

const mountState = <State>(
  initState: State | (() => State),
): [State, Dispatch<State>] => {
  const hook = mountWorkInProgressHook();
  let memoizedState;
  if (initState instanceof Function) {
    memoizedState = initState();
  } else {
    memoizedState = initState;
  }
  const queue = createUpdateQueue<State>();
  hook.updateQueue = queue;
  hook.memoizedState = memoizedState;

  //@ts-ignore
  //dispatch会触发schedule开启新一轮渲染，同时也会讲更新添加进队列
  const dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
  queue.dispatch = dispatch;
  return [memoizedState, dispatch];
};

function dispatchSetState<State>(
  fiber: FiberNode,
  updateQueue: UpdateQueue<State>,
  action: Action<State>,
) {
  const update = createUpdate(action);
  enqueueUpdate(update, updateQueue);
  ScheduleUpdateOnFiber(fiber);
}

const HookDispatcherOnMount: Dispatcher = {
  useState: mountState,
};

//函数式组件hook的依次调用被设为next来进行连接，保证更新的顺序
const mountWorkInProgressHook = () => {
  const hook: Hook = {
    memoizedState: null,
    updateQueue: null,
    next: null,
  };
  if (workInProgressHook == null) {
    //mount
    if (currentlyRenderingFiber == null) {
      throw Error("请在函数式组件调用hook");
    }
    workInProgressHook = hook;
    currentlyRenderingFiber.memorizedState = workInProgressHook;
  } else {
    workInProgressHook.next = hook;
    workInProgressHook = hook;
  }
  return workInProgressHook;
};
