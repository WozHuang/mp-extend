//app.js
const extend = require('./mp-extender/index.js')
App = extend.App
Page = extend.Page
Component = extend.Component
App({
  onLaunch: function () {
    // 获取从 extend 1 中混入的值
    console.log('app.js的onLaunch函数中获取extend 1 中的值：', this.helloApp)
  },
  globalData: {
    userInfo: null
  }
})