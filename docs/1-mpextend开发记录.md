## 在小程序中实现全局混入，以混入的形式扩展小程序的api ##

> **GitHub**: [https://github.com/WozHuang/mp-extend](https://github.com/WozHuang/mp-extend)

### 主要目标 ###

小程序本身的坑不少，开发时免不了需要引入或大或小的框架。而目前的小程序开发框架基本分为两种，一种是以Taro、wePY这种以其他技术栈开发小程序，一种是在原有的小程序开发模式上进行扩展。

对于新建立的项目，选择何种框架全凭喜好，可以优先考虑与团队技术栈相关的开发框架。但是多数时候开发者还是使用小程序官方的开发方式，并且已经开发了一段时间并投入使用了，这时再考虑引入框架代价就有点大了，于是我就在寻找一个能够在不改动现有代码前提下扩展小程序api的框架。

### 寻找资料 ###

参考了westore，omix，wxpage等基于小程序自身扩展的框架后，发现他们统一都是在APP、Page、Component构造函数上做文章，对页面本身的PageOption进行操作，实现扩展api的功能。

小程序中有部分Vue和React的影子（data属性，setData方法），而Vue和React都有mixin这种扩展组件的方式，于是便考虑在Page构造函数上做文章，提供全局混入的能力来扩展api。

### 代码实现 ###

我实现混入中的两个主要函数：

**1. 装饰函数**

> 使用装饰方法对PageOption（Page函数调用时传入的参数）中的生命周期函数（onLoad等）进行修改，调用混入的生命周期方法。

```js
// 对原有函数进行修改，返回结果是原函数的返回结果
// 在调用原函数之前调用所有装饰器
function decorate(f, ...decorators) {
  return function () {
    for (const decorator of decorators) {
      decorator && decorator.apply(this, arguments);
    }
    return f && f.apply(this, arguments);
  };
}
```

**2. 合并混入对象**

> 使用mixin函数将混入中的对象与PageOption原有的对象进行合并

```js
/**
 * 实现混入的效果
 * 类似 Object.assign， 但在遇见相同属性名均是对象时会递归进行合并而非直接覆盖
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
```

**3. 重写Page函数（App，Component同理）**

> 在调用Page函数前将所有混入对象合并到PageOption中

```js
// base.Page 页面的基类，包含所有混入对象的非生命周期属性
// lifeMixin.Page 包含所有混入对象的生命周期函数
// life.Page 一个数组包含Page所有的生命周期 ['onLoad', 'onShow', ...]

const _Page = decorate(Page, function (option) {
  // 合并非生命周期属性
  mixin(option, base.Page);
  // 合并生命周期属性
  for (const lifeTime of life.Page) {
    option[lifeTime] = decorate(option[lifeTime], ...lifeMixin.Page[lifeTime]);
  }
  // preprecess是扩展的生命周期，在Page函数调用前被调用，可以用于修改PageOption
  option['preproccess'] && option['preproccess'].call(option, option);
});
```

通过重写Page函数在将混入对象合并到PageOption中实现全局混入的功能，最后只需要在现有代码前加入一行 `Page = _Page;`，即可实现全局混入的能力而无需修改其他代码。

### 使用示例 ###

能够方便地以全局混入的方式扩展api，以下是一个简单示例：混入data属性 和 添加PV统计功能

```js
Page: {
  data: {
    exData: '所有页面的data都会获得exData属性'
  },
  
  onLoad(){
    console.log(`PV统计: 在${formatTime(new Date())} 打开了页面 ${this.__route__}`)
  }
}
```

如果觉得有用可以去[GitHub](https://github.com/WozHuang/mp-extend)给我一个小星星（满脸期待.jpg）

> 参考资料
> [wxpage](https://github.com/tvfe/wxpage)
> [omi](https://github.com/Tencent/omi)
> [Vue mixins](https://cn.vuejs.org/v2/guide/mixins.html#%E9%80%89%E9%A1%B9%E5%90%88%E5%B9%B6)
> [微信小程序之提高应用速度小技巧](https://wetest.qq.com/lab/view/294.html)