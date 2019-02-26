import formatTime from '../utils/time.js'

export default {
  App: {
    onLaunch(){
      console.log(`打开了小程序`)
    }
  },
  Page: {
    onLoad(){
      console.log(`PV统计: 在${formatTime(new Date())} 打开了页面 ${this.__route__}`)
    }
  }
}