//react 合成事件中间件
/*它并不会把事件处理函数直接绑定到真实的节点上，而是把所有事件绑定到 结构的最外层，
使用一个统一的 事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。
当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象；
当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。
这样做简化了事件处理和回收机制，效率也有很大提升。*/

/**
 * 基本思路: 由root触发事件，并获取target，进行捕捉和冒泡，最后统一触发。
 * 为了与原生jsDOM不同，改为了自定义的props和中断字样，方便自定义
 */
import { Container } from "hostConfig";
import { Props } from "shared/ReactElementTypes";
import { container } from "webpack";

const elementPropsKey = "__props";
//停止冒泡的key
const stopPropagationKey = "__stopPropagation";
const validEventTypeList = ["click"];

type EventCallback = (e?: Event) => void;

interface SyntheticEvent extends Event {
  [stopPropagationKey]: boolean;
}

interface Paths {
  capture: EventCallback[];
  bubble: EventCallback[];
}

export interface DOMElement extends Element {
  [elementPropsKey]: Props;
}

//dom props update
export const updateDomProps = (node: DOMElement, props: Props) => {
  //props绑定给__props
  node[elementPropsKey] = props;
};

const createSyntheticEvent = (e: Event) => {
  const syntheticEvent = e as SyntheticEvent;
  syntheticEvent[stopPropagationKey] = false;
  const originStopPropagation = syntheticEvent.stopPropagation;
  //往里面添加自己的禁止传播
  syntheticEvent.stopPropagation = () => {
    syntheticEvent.__stopPropagation = true;
    if (originStopPropagation) {
      originStopPropagation();
    }
  };
  return syntheticEvent;
};

//初始化事件，所有的事件大概率都会冒泡到document上，在document进行调度
export const initEvent = (container: Container, eventType: string) => {
  if (!validEventTypeList.includes(eventType)) {
    console.warn("事件不包括在当前可执行事件中");
    return;
  }
  if (__DEV__) {
    console.log("初始化事件：", eventType);
  }

  //根部root监听
  container.addEventListener(eventType, (e: Event) => {
    dispatchEvent(container, eventType, e);
  });
};

const dispatchEvent = (container: Container, eventType: string, e: Event) => {
  const target = e.target;
  // 收集沿途的capture and bubble
  const paths = collectPaths(container, eventType, target as DOMElement);
  // 构造合成的事件
  const syntheticEvents = createSyntheticEvent(e);
  // 触发capture和 bubble
  triangleEvent(paths.capture, syntheticEvents);
  if (syntheticEvents[stopPropagationKey]) {
    triangleEvent(paths.bubble, syntheticEvents);
  }
};

const getEventCallbackNameFromEventType = (eventType: string) => {
  return {
    click: ["onClickCapture", "onClick"],
  }[eventType];
};

const collectPaths = (
  container: Container,
  eventType: string,
  target: DOMElement,
) => {
  let node = target;
  const paths: Paths = {
    capture: [],
    bubble: [],
  };
  while (node != container && node) {
    //收集callback
    const props = node[elementPropsKey];
    const callBackName = getEventCallbackNameFromEventType(eventType);
    //将节点的props处理进去
    if (props && callBackName) {
      callBackName.map((item, index) => {
        const callBack = props[item];
        if (callBack && index == 0) {
          //capture从上到下
          paths.capture.unshift(callBack);
        }
        if (callBack && index == 1) {
          //bubble从下到上
          paths.bubble.push(callBack);
        }
      });
    }
    node = node.parentNode as DOMElement;
    //props存在，收集对应处理
  }
  return paths;
};

//事件触发
const triangleEvent = (callBack: EventCallback[], e: SyntheticEvent) => {
  for (let i = 0; i < callBack.length; i++) {
    callBack[i].call(null, e);
    if (e[stopPropagationKey]) {
      //停止捕捉
      break;
    }
  }
};
