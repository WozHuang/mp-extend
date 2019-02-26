// 提供全局的事件监听、触发
// 直接使用了mitt （https://www.npmjs.com/package/mitt），api完全相同
import mitt from '../utils/mitt.js'
const globalEmitter = mitt()
export default {
  Page: {
    $on: globalEmitter.on,
    $off: globalEmitter.off,
    $emit: globalEmitter.emit
  }
}