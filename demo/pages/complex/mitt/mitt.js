// pages/complex/mitt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mitt_data: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const handler = (data) => {
      this.setData({
        mitt_data: data.mitt_data
      })
      // 记得取消事件监听
      this.$off('mitt-test');
    }
    this.$on('mitt-test', handler);
  },
})