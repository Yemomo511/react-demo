//dom宿主环境配置
/*
Element is the most general base class from which all objects in a Document inherit. It only has methods and properties common to all kinds of elements. More specific classes inherit from Element.
Element 是最通用的基类，Document 中的所有对象都继承自该基类。它只具有各种元素共有的方法和属性。更具体的类继承自 Element。
*/
export type Container = Element;
export type Instance = Element;

export const createInstance = (type: string, ...args: any) => {
  const element = document.createElement(type);
  //待处理props
  return element;
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
  console.log(textElement);
  return textElement;
};

export const appendChildToContainer = appendInitialChild;
