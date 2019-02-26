// pages/complex/preload.js
Page({
  
  data: {
    url1: '/pages/complex/preload/preload1?number=10',
    url2: '/pages/complex/preload/preload2?number=10',
    url3: '/pages/complex/preload/preload3?number=10',
  },

  onShow: function () {
    // 打开页面时直接预加载
    // 一般写在onLoad里面就可以了，这里写在onShow是为了方便测试
    const url = this.data.url1;
    this.$preload(url)
  },

  // 在跳转前才预加载
  // 这里加了一个跳转延迟，在不影响使用的前提下能够
  // 调整延时的时间可以模拟在不同条件下的效果
  toPreload2() {
    setTimeout(() => {
      const url = this.data.url2;
      this.$preload(url)
      wx.navigateTo({ url })
    },500)
  },

  toPreload3() {
    setTimeout(() => {
      const url = this.data.url3;
      wx.navigateTo({ url })
    }, 500)
  }

})