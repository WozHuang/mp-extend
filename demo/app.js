//app.js
import extend from './mp-extend/index.js'
App = extend.App
Page = extend.Page
Component = extend.Component
console.log(`作者:\tWozHuang\nGitHub:\thttps://github.com/WozHuang/mp-extend`)
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: '我是app.globalData.userInfo的数据'
  }
})