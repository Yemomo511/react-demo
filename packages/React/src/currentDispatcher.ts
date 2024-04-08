import { Action } from "shared/ReactElementTypes";

//useState(a) useState(()=>1)
export interface Dispatcher {
  useState: <T>(state: T | (() => T)) => [T, Dispatch<T>];
  useReducer?: <T>(
    state: T,
    reduce: Record<string, Action<T>>,
  ) => [T, Dispatch<T>];
}

export type Dispatch<State> = (state: Action<State>) => void;

const currentDispatcher: {
  current: Dispatcher | null;
} = {
  current: null,
};

export const resolveDispatcher = (): Dispatcher => {
  const dispatcher = currentDispatcher.current;
  if (dispatcher === null) {
    throw new Error("Invalid hook call");
  }
  return dispatcher;
};

export default currentDispatcher;
