// pages/complex/globalData2.js
const msg = [
  '哈哈哈，真乖，叫你点你就点',
  '你怎么还点',
  '你再点我要生气了',
  '我生气了，不变了'
];
Page({
  changeGlobalData() {
    const idx = Math.min(msg.indexOf(this.data.$globalData.userInfo) + 1,3)
    this.$globalSetData({
      userInfo: msg[idx]
    })
  }
})