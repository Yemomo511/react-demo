//涉及更新列表,参考https://kasong.gitee.io/just-react/state/update.html#updatequeue
import { Action } from "shared/ReactElementTypes";
import { Update } from "./fiberFlags";
import { Dispatch } from "react/src/currentDispatcher";

export interface Update<State> {
  action: Action<State>;
}

export interface UpdateQueue<State> {
  share: {
    //pending给个头就行
    pending: Update<State> | null;
  };
  dispatch: Dispatch<State> | null;
}

export function createUpdate<State>(action: Action<State>): Update<State> {
  return {
    action,
  };
}

export function createUpdateQueue<State>() {
  return {
    share: {
      pending: null,
    },
    dispatch: null,
  } as UpdateQueue<State>;
}

export function enqueueUpdate<State>(
  update: Update<State>,
  updateQueue: UpdateQueue<State>,
) {
  updateQueue.share.pending = update;
}

/**
 * process 处理方面的函数
 * 用于处理更新队列
 * 调用一些更新方法例如this.setState 会创造一个Update ，会根据UpdateQueue循环处理，对baseState进行reduce处理
 * 更新可能包括函数调用或值更新，因此会有两个，一般来说process会有循环套在外面的
 */
export function processUpdateQueue<State>(
  baseState: State,
  pendingUpdate: Update<State> | null,
): {
  memorized: State;
} {
  /*ReturnType 可以帮助获取特定函数的返回类型
   *function sayHello(){return {foo:"foo"}}
   *ReturnType<sayHello>
   */
  const result: ReturnType<typeof processUpdateQueue<State>> = {
    memorized: baseState,
  };
  if (pendingUpdate != null) {
    const action = pendingUpdate.action;
    if (action instanceof Function) {
      result.memorized = action(baseState);
    } else {
      result.memorized = action;
    }
  }
  return result;
}
