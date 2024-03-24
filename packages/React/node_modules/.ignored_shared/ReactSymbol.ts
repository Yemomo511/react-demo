//由于reactElement $$typeof很特殊，因此定义为一个symbol类型作为独一无法的标识，防止ReactElement被滥用

//Symbol会产生一个唯一的值，symbol.for()会在全局产生一个唯一的值
const supportSymbol = typeof Symbol === "function" && Symbol.for;

export const REACT_ELEMENT_TYPE = supportSymbol
  ? Symbol.for("react-element")
  : 0xeac7;
