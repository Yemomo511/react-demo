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
