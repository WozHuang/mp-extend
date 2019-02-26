// pages/complex/preload/preload1.js
import fetch from '../../../utils/api-test.js'
Page({
  // 需要预加载的页面 path 属性是必须的，需要与app.json中的页面路径相同
  path:'pages/complex/preload/preload1',
  data: {
    list: []
  },

  onPreload(option) {
    const { number } = option
    fetch(number, 'preload1')
      .then(res => {
        this.setData({ list:res })
      })
  },
})