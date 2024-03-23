/**@jsx DidAct.createElement */

//根据fiber思想，一个element需要一个fiber，一个fiber是work unit fibe上面很多工作
let nextUnitOfWork;

//根节点，workInProgress,root，由于线程空闲时才渲染DOM，所以会渲染不完整的UI，为了防止这种情况需要从此处删除更改DOM的部分
//所以会跟踪fiber tree的根节点，当没有下一个work unit即fiber，才会插入dom

let workInProgressRoot;

//当前的fiberRoot，对比进行双渲染
let currentRoot;

// fiber插入时从workInProgressRoot开始 ，没有old fibers ，使用一个数组保存我们需要删除的节点

let deletions;

let workInProgressFiber;
let hookIndex;
/**
 *
 * key包括
 * 1. children 子节点
 * 2. event onClick等
 * 3. property name ,data ,style等
 */

const isProperty = (key) => {
  return key != "children" && !isEvent(key);
};
const isEvent = (key) => {
  return key.startsWith("on");
};
//update机制，需要判断是否需要更新，两种情况1. key被删除了 2. key被更新了
//由于需要对比，考虑闭包
const isGone = (prev, next) => {
  return (key) => {
    return !(key in next);
  };
};

const isNew = (prev, next) => {
  return (key) => {
    return prev[key] !== next[key];
  };
};

const createTextElement = (text) => {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
};
//更新dom
const updateDOM = (dom, prevProps, nextProps) => {
  //1.移除旧的或者改变的 event onclick等
  //过滤逻辑 首先找props中带on的，然后找与nextProps值不一样，或者nextProps中压根没有这个key
  //比如一个绑定console.log("hello world")一个绑定console.log("hello world1")
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => {
      //旧的On系列key如果在nextProps没有或者两个不一样就删除
      return !(key in nextProps) || isNew(prevProps, nextProps)(key);
    })
    .forEach((key) => {
      //索引2创建lowercase的key
      const eventType = key.toLowerCase().substring(2);
      //example: onClick -> click substring
      dom.removeEventListener(eventType, prevProps[key]);
    });

  //移除旧的props,需要排除children
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(
      (key) =>
        isGone(prevProps, nextProps)(key) || isNew(prevProps, nextProps)(key),
    );
};
