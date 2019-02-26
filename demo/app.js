//app.js
import extend from './mp-extend/index.js'
App = extend.App
Page = extend.Page
Component = extend.Component
App({
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: '我是app.globalData.userInfo的数据'
  }
})