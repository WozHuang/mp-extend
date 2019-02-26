import mpExtend from './mp-extend.js'

// 以mpExtend(...)的形式引入多个扩展
// 如果不需要某一个混入项的功能，直接注释掉即可
import extendTest from './simple/extend-test.js'
import extendData from './simple/extend-data.js'
import extendNavigateTo from './simple/extend-navigateTo.js'
import extendPV from './simple/extend-PV.js'

import extendPage from './complex/extend-page.js'
import extendGlobalData from './complex/extend-globalData.js'
import extendMitt from './complex/extend-mitt.js'
import extendPreload from './complex/extend-preload.js'
import extendOData from './complex/extend-oData.js'

// mpExtend(extendTest); // 这是一个比较完整的测试用例
mpExtend(extendData);
mpExtend(extendNavigateTo);
mpExtend(extendPV);

mpExtend(extendPage);
mpExtend(extendGlobalData);
mpExtend(extendMitt);
mpExtend(extendPreload);
mpExtend(extendOData);

// 暴露App、Page、Component构造函数
export default {
  App: mpExtend.App,
  Page: mpExtend.Page,
  Component: mpExtend.Component,
};