import { Dispatch, Dispatcher } from "react/src/currentDispatcher";
import { FiberNode } from "./fiber";
import {
  UpdateQueue,
  createUpdate,
  createUpdateQueue,
  enqueueUpdate,
  processUpdateQueue,
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
let currentHook: Hook | null = null;
console.log(internals);
const currentDispatcher = internals.currentDispatcher;

//hook的调度机制 https://react.iamkasong.com/hooks/prepare.html
/**
 * 简单来说就useState和dispatch(setState)两个使用时刻，我们将useState称为声明阶段，dispatch称为调度阶段
 * 声明阶段:
 *  mount: 根据代码从上到下创建hook并使用next链接起来，同时赋予初始initState，并返回，所有hook均在
 *         Fiber.memorizeState上面
 *  update: 根据调度发生在hook结构体上的update更新initState，并返回更新后的updateState
 * 调度阶段:
 *  给hook结构体上的updateQueue添加新的update，启动再次渲染，在新的声明阶段会计算出对应的update并重新赋值。同时
 *  打上对应的flags
 */

//begin阶段处理
export const renderWithHooks = (wip: FiberNode) => {
  //hook 处理
  currentlyRenderingFiber = wip;
  //当前wip重置，准备处理后返回
  wip.memorizedState = null;

  const current = wip.alternate;
  if (current != null) {
    //绑定好updateHook执行逻辑
    //看看hook上有没有绑定的
    currentDispatcher.current = HookDispatcherOnUpdate;
  } else {
    //绑定好对应的mountHook执行逻辑
    currentDispatcher.current = HookDispatcherOnMount;
  }

  //Function Component的type为()=>{},可以直接把props传递，会返回对应的ReactElement
  const FunctionComponent = wip.type;
  const props = wip.pendingProps;
  console.log(currentDispatcher);
  const children = FunctionComponent(props);
  //函数组件及时清理，保证hook调用是在函数式组件调用
  //运行完毕将此函数的hook清除
  workInProgressHook = null;
  currentHook = null;
  currentlyRenderingFiber = null;

  return children;
};

//声明阶段
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

const updateState = <State>(): [State, Dispatch<State>] => {
  //更新的触发，准备更新
  const hook = updateWorkInProgressHook();
  const update = hook.updateQueue as UpdateQueue<State>;
  const pending = update.share.pending;
  if (pending != null) {
    //计算新的state
    const { memorized } = processUpdateQueue(hook.memoizedState, pending);
    hook.memoizedState = memorized;
  }

  return [hook.memoizedState, update.dispatch as Dispatch<State>];
};

//mount hook执行逻辑
const HookDispatcherOnMount: Dispatcher = {
  useState: mountState,
};
const HookDispatcherOnUpdate: Dispatcher = {
  useState: updateState,
};

//调度阶段
function dispatchSetState<State>(
  fiber: FiberNode,
  updateQueue: UpdateQueue<State>,
  action: Action<State>,
) {
  const update = createUpdate(action);
  enqueueUpdate(update, updateQueue);
  ScheduleUpdateOnFiber(fiber);
}

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

const updateWorkInProgressHook = () => {
  let nextCurrentHook: Hook | null;
  if (currentHook == null) {
    const currentFiber = currentlyRenderingFiber?.alternate;
    if (currentFiber != null) {
      //自己的渲染的没有，触发dispatcher是给currentFiber的hook添加东西
      //@ts-ignore
      currentlyRenderingFiber.memorizedState = currentFiber.memorizedState;
      nextCurrentHook = currentFiber.memorizedState;
    } else {
      nextCurrentHook = null;
    }
  } else {
    nextCurrentHook = currentHook.next;
  }

  if (nextCurrentHook == null) {
    throw Error("组件更新时hook挂载数量不同步");
  }
  currentHook = nextCurrentHook;

  //把旧的不断链接过来
  const newHook: Hook = {
    memoizedState: currentHook.memoizedState,
    updateQueue: currentHook.updateQueue,
    next: null,
  };

  if (workInProgressHook == null) {
    //首次加载
    if (currentlyRenderingFiber == null) {
      throw Error("请在函数式组件调用hook");
    }
    workInProgressHook = newHook;
  } else {
    workInProgressHook.next = newHook;
    workInProgressHook = newHook;
  }

  return workInProgressHook;
};
