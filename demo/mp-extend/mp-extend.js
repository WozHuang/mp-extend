/*!
 * mp-extend v1.0.0 (https://github.com/WozHuang/mp-extend)
 * Licensed under the MIT license
 */

// 可以用于拓展的生命周期
const life = {
  App: ['preprocess', 'onLaunch', 'onShow', 'onHide', 'onError'],
  Page: ['preprocess', 'onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage'],
  Component: ['preprocess', 'created', 'attached', 'ready', 'moved', 'detached', 'error']
};

// 用于保存所有的拓展生命周期函数
let lifeMixin = {};
for (let key in life) {
  lifeMixin[key] = lifeMixin[key] || {};
  for (let lifeTime of life[key]) {
    lifeMixin[key][lifeTime] = [];
  }
}

// 基类对象
// 在调用App、Page、Component前会被混入到对象中
let base = {
  App: {},
  Page: {},
  Component: {}
}

let MpExtend = function (param) {
  // 允许接收数组形式的参数
  if (isArray(param)) {
    param.forEach(item => MpExtend(item));
    return;
  }

  for (const constructorName in param) {
    // constructorName 应当是[App, Page, Component] 中的一个
    if (!life[constructorName]) {
      warning(constructorName, 'not found');
      continue;
    }

    const option = Object.assign({}, param[constructorName]);
    // 如果是生命周期中的某一个，作为生命周期拓展
    for (const key in option) {
      if (lifeMixin[constructorName][key]) {
        lifeMixin[constructorName][key].push(option[key]);
        delete option[key];
      }
    }
    // 把剩余的属性混入到基类中
    mixin(base[constructorName], option);
  }
}

// 重新包装的 App、Page、Component构造函数
// 虽然都是相似的代码但是这样更利于理解和修改
const _App = decorate(App, function (option) {
  mixin(option, base.App);
  for (const lifeTime of life.App) {
    option[lifeTime] = decorate(option[lifeTime], ...lifeMixin.App[lifeTime]);
  }
  option['preprocess'] && option['preprocess'].call(option, option);
});
const _Page = decorate(Page, function (option) {
  mixin(option, base.Page);
  for (const lifeTime of life.Page) {
    option[lifeTime] = decorate(option[lifeTime], ...lifeMixin.Page[lifeTime]);
  }
  option['preprocess'] && option['preprocess'].call(option, option);
});
const _Component = decorate(Component, function (option) {
  mixin(option, base.Component);
  for (const lifeTime of life.Component) {
    option[lifeTime] = decorate(option[lifeTime], ...lifeMixin.Component[lifeTime]);
  }
  option['preprocess'] && option['preprocess'].call(option, option);
});

// 装饰函数
// 在调用原函数之前调用所有装饰器
function decorate(f, ...decorators) {
  return function () {
    for (const decorator of decorators) {
      decorator && decorator.apply(this, arguments);
    }
    return f && f.apply(this, arguments);
  };
}

/**
 * 实现类似混入的效果
 * 类似 Object.assign， 但在遇见相同属性名均是对象时会递归进行合并而非直接覆盖
 * @param o
 * @param mix 可以传入多个
 * 注：如果存在引用循环递归会栈溢出
 */
function mixin(o, ...mixs) {
  mixs.forEach(mix => {
    for (const key in mix) {
      // 两个属性都是对象则递归合并
      if (isObject(o[key]) && isObject(mix[key])) {
        mixin(o[key], mix[key]);
      } else {
        o[key] = o[key] || mix[key];
      }
    }
    // 拷贝symbol类型，（可惜小程序不支持）
    for (const sym of Object.getOwnPropertySymbols(mix)) {
      o[sym] = o[sym] || mix[sym];
    }
  });
  return o;
}

function isObject(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}

function isArray(o) {
  return Object.prototype.toString.call(o) === "[object Array]";
}

function warning(...msg) {
  MpExtend.tips && console.warn('mp-extend:', ...msg);
}

Object.assign(MpExtend, {
  mixin,
  decorate,
  App: _App,
  Page: _Page,
  Component: _Component,
  warning,
  tips: true
});
export default MpExtend;