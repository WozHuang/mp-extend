// pages/complex/page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 只有存在path属性的页面才会被记录
  path: "pages/complex/page",

  onLoad: function (options) {
    console.log('\n')
    console.log('所有存在path属性的页面的创建对象都会被保存在一个对象中，可以通过this.$getAllPage()获取')
    console.log(this.$getAllPage())
    console.log('所有已经创建的页面实例都会被保存在一个对象中，可以通过this.$getCurrentPages()获取')
    console.log(this.$getCurrentPages())
    console.log('\n')
  }
})