// 统计所有的页面实例
// this.$getAllPage() 返回所有的含有path属性的页面构造对象构造的对象（非页面实例）
// this.$getCurrentPages() 返回一个对象，key为页面路径，value为当前所有已经创建的页面实例

let pages = {}
let currentPages = {}

export default {
  Page: {
    preproccess(option){
      if(option.path){
        pages[option.path] = option
      }
    },
    onLoad(options){
      currentPages[this.__route__] = this
    },
    onUnload(){
      delete currentPages[this.__route__]
    },

    $getAllPage(){
      return pages;
    },

    $getCurrentPages(){
      return currentPages;
    }
  }
}