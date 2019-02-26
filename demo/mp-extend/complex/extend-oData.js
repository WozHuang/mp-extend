// 使用了 omix(https://github.com/Tencent/omi) 中的部分代码
// 让对 oData的修改能够自动使用setData更新到视图上

import obaa from '../utils/obaa.js'

export default {
  Page:{
    onLoad(){
      this.oData = JSON.parse(JSON.stringify(this.data))
      observe(this)
    }
  }
}

function observe(ele) {
  let timeout = null
  let patch = {}

  obaa(ele.oData, (prop, value, old, path) => {
    clearTimeout(timeout)
    if (prop.indexOf('Array-push') === 0) {
      let dl = value.length - old.length
      for (let i = 0; i < dl; i++) {
        patch[fixPath(path + '-' + (old.length + i))] = value[(old.length + i)]
      }
    } else if (prop.indexOf('Array-') === 0) {
      patch[fixPath(path)] = value
    } else {
      patch[fixPath(path + '-' + prop)] = value
    }
    timeout = setTimeout(() => {
      ele.setData(patch)
      patch = {}
    }, 0)
  })
}

function fixPath(path) {
  let mpPath = ''
  const arr = path.replace('#-', '').split('-')
  arr.forEach((item, index) => {
    if (index) {
      if (isNaN(parseInt(item))) {
        mpPath += '.' + item
      } else {
        mpPath += '[' + item + ']'
      }
    } else {
      mpPath += item
    }
  })
  return mpPath
}