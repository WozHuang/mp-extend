// pages/complex/preload/preload3.js
import fetch from '../../../utils/api-test.js'
Page({
  data: {
    list: []
  },

  onPreload(option) {
    const { number } = option
    fetch(number, 'preload3')
      .then(res => {
        this.setData({ list: res })
      })
  },
})