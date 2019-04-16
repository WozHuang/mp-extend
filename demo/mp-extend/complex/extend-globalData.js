// 将app.globalData注入到所有页面的data.$globalData中
// 并提供this.$globalSetData的方法修改 globalData

let appInstance = null;

// 本来应该以symbol类型作为key避免冲突，但是小程序不支持，只能直接用字符串类型了
// let $globalSetDataArray = Symbol('$globalSetDataArray')
let $globalSetDataArray = '$globalSetDataArray'

export default {
  App: {
    onLaunch() {
      appInstance = this
    },

    $globalSetData(o) {
      const pages = getCurrentPages();
      if (pages.length === 0) {
        // 如果还没有页面实例化，把 globalSetData 的数据暂存起来
        this[$globalSetDataArray].push(o);
      } else {
        // 如果已经有实例化的页面，直接对前台页面 globalSetData
        pages[pages.length - 1].$globalSetData(o);
      }
    },

    // 在还没有实例化的页面时用于暂存
    [$globalSetDataArray]: [],
  },
  Page: {
    onLoad() {
      this.setData({
        $globalData: appInstance.globalData
      })

      // 保证在页面未创建时进行 $globalSetData 也能影响到所有页面
      appInstance[$globalSetDataArray].forEach(obj => {
        this.$globalSetData(obj);
      });
      appInstance[$globalSetDataArray] = [];
    },

    // 根据小程序文档中描述，所有非显示的页面都不应当调用setData
    // 这里使用一个 $globalSetDataArray 数组暂存在页面显示时需要更新的data
    // 在页面onShow时才调用setData进行更新
    onShow() {
      this[$globalSetDataArray].forEach(obj => {
        this.setData(obj);
      });
      this[$globalSetDataArray] = [];
    },

    [$globalSetDataArray]: [],

    $globalSetData(o) {
      // 所有页面setData所用的object
      let obj = {};
      for (let key in o) {
        obj['$globalData.' + key] = o[key]
      }

      // 对当前页面堆中的所有页面进行操作
      const currentPages = this.$getCurrentPages()
      for (const pagePath in currentPages) {
        const pageItem = currentPages[pagePath]
        // 直接调用前台页面的setData
        if (pageItem.__route__ === this.__route__) {
          pageItem.setData(obj)
          // 更新 app.globalData 的值
          appInstance.globalData = deepCopyData(pageItem.data.$globalData)
        }
        // 后台页面暂存到数组中
        else {
          pageItem[$globalSetDataArray].push(obj)
        }
      }
    }
  }
}

/**
 * 用于data的深拷贝，不可用于函数、时间、正则等
 */
function deepCopyData(o) {
  return JSON.parse(JSON.stringify(o))
}