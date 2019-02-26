// 通过预加载提高小程序的响应速度，参考了wxpage(https://github.com/tvfe/wxpage)的api
// 为页面添加 onPreload 生命周期
// 提供 $preload 方法预加载页面
import parseUrl from '../utils/parseUrl.js';
import extendPage from '../complex/extend-page.js';

// 所有预加载的数据都会被存入这个对象中
const preloadData = {};

function preload(url) {
  const urlData = parseUrl(url)
  // 获得页面（非页面实例）
  const page = extendPage.Page.$getAllPage()[urlData.path]
  if (!page) {
    // 页面应当是有 path 属性的页面
    console.error('没有找到页面', urlData.path)
    return;
  }
  preloadData[urlData.path] = [];
  page.onPreload.call(Object.assign({ setData }, page), urlData.query);
}

// 模拟setData方法
function setData(obj) {
  const pageInstance = extendPage.Page.$getCurrentPages()[this.path]
  // 如果已经有页面实例了就直接在页面上setData
  if (pageInstance) {
    pageInstance.setData(obj);
  }
  // 如果还没有就暂时存在变量中
  else {
    preloadData[this.path] = preloadData[this.path] || [];
    preloadData[this.path].push(obj);
  }
}

export default {
  Page: {
    $preload: preload,
    onLoad(option) {
      // 如果已经预加载了，取出预加载的数据直接setData
      if (preloadData[this.path]){
        const dataList = preloadData[this.path];
        dataList.forEach(item=>{
          this.setData(item);
        })
        delete preloadData[this.path];
      }
      // 没有预加载的话直接正常执行加载
      else{
        this.onPreload && this.onPreload(option)
      }
    }
  }
}