const ReactElement = function (type, props, ref, key) {
  return {
    $$typeof: aaa,
    type,
    props,
    ref,
    key,
    __mark: "yemomo",
  };
};

//此jsx遵循Classic模式，详细参考
//https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=DwEwlgbgBA1gpgTwLwCICGGVRGgLm1AI0KwHsA7AYQBswBjGVAbwzQF8UA-VjYAenAROQA&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.24.3&externalPlugins=&assumptions=%7B%7D
