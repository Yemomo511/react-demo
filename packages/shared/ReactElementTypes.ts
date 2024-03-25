export type ElementType = any;
export type Key = any;
export type Ref = any;
export type Props = any;
export type Mark = string;

export interface ReactElementType {
  $$typeof: symbol | number;
  type: ElementType;
  props: Props;
  ref: Ref;
  key: Key;
  __mark: string;
}

//Action要不是修改state，要不是值
//setState(3) setState((state)=>{ state = 3}) 可以看出这个设计思想
export type Action<State> = State | ((preState:State)=>State)
