const mpExtend = require('./mp-extend.js')

// 引入多个扩展
const extendTest = require('./extension/extend-test.js')
mpExtend(extendTest);

// 暴露App、Page、Component构造函数
module.exports = {
  App: mpExtend.App,
  Page: mpExtend.Page,
  Component: mpExtend.Component,
}