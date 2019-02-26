// pages/complex/mitt2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  emit(){
    this.$emit('mitt-test',{
      mitt_data: '来自事件 "mitt-test" 的mitt_data：' + (new Date())
    })
    wx.showToast({
      title: '已触发'
    })
  }
})