// 为所有页面添加一个navigateTo方法
export default {
  Page: {
    navigateTo(e) {
      const { url } = e.currentTarget.dataset
      wx.navigateTo({ url })
    },
    navigateBack() {
      wx.navigateBack()
    }
  }
}