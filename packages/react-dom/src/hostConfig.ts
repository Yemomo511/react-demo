//dom宿主环境配置

import { FiberNode } from "react-reconciler/src/fiber";
import { HostComponent, HostText } from "react-reconciler/src/fiberTag";
import { Props } from "shared/ReactElementTypes";
import { DOMElement, updateDomProps } from "./SyntheticEvent";

/*
Element is the most general base class from which all objects in a Document inherit. It only has methods and properties common to all kinds of elements. More specific classes inherit from Element.
Element 是最通用的基类，Document 中的所有对象都继承自该基类。它只具有各种元素共有的方法和属性。更具体的类继承自 Element。
*/
export type Container = Element;
export type Instance = Element | TextInstance;
//Text 文本节点
export type TextInstance = Text;

export const commitUpdate = (fiber: FiberNode) => {
  console.log(fiber.tag, "commitUpdate");
  let stateNode: Instance;
  switch (fiber.tag) {
    case HostComponent:
      const props = fiber.memorizedProps;
      stateNode = fiber.stateNode as Instance;
      // updateDomProps(stateNode, props);
      break;
    case HostText:
      const text = fiber.memorizedProps.content;
      stateNode = fiber.stateNode as TextInstance;
      updateText(text, stateNode);
      break;
    default:
      if (__DEV__) {
        console.log("更新失败，此tag暂时未实现更新机制");
      }
  }
};

export const createInstance = (type: string, props: Props) => {
  const element = document.createElement(type) as unknown;
  //待处理props
  updateDomProps(element as DOMElement, props);
  return element as DOMElement;
};

export const appendInitialChild = (
  parent: Container | Instance,
  instance: Instance,
) => {
  //直接添加为子child
  parent.appendChild(instance);
};

export const createTextInstance = (content: string) => {
  const textElement = document.createTextNode(content);
  return textElement;
};

export const removeChild = (
  container: Container | Instance,
  instance: Instance,
) => {
  container.removeChild(instance);
};

const updateText = (content: string, textNode: TextInstance) => {
  textNode.textContent = content;
};

export const appendChildToContainer = appendInitialChild;
