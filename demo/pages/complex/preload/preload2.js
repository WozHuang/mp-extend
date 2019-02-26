// pages/complex/preload/preload2.js
import fetch from '../../../utils/api-test.js'
Page({
  // 需要预加载的页面 path 属性是必须的，需要与app.json中的页面路径相同
  path: 'pages/complex/preload/preload2',

  data: {
    list: []
  },

  onPreload(option) {
    const { number } = option;
    this.getData(number)
  },

  // PS：即便是调用了其他函数，setData不在 onPreload 内也无所谓
  getData(number) {
    fetch(number, 'preload2')
      .then(res => {
        this.setData({ list: res })
      })
  }
})