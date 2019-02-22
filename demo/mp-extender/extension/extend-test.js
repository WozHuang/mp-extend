// 测试 mp-extend的基本功能
module.exports = [
  // extend 1
  {
    App: {
      onLaunch() {
        console.log('extend 1： App启动啦')
      },
      globalData: {
        globalEx1: 'extend 1: 我是混入到全局变量中的值'
      },
      preproccess(option) {
        console.log('extend 1： 预处理，调用了App方法, 参数为', option)
        // 此时可以修改option的值
        // PS： 这是this也指向option，使用this修改更利于阅读
        option.helloApp = 'extend 1 修改的一个值'
        this.helloApp2 = 'extend 1 修改的另一个值'
      }
    },
    Page: {
      preproccess(option) {
        console.log('extend 1： 预处理，调用了Page方法, 参数为', option)
      },
      onLoad() {
        console.log('extend 1： 加载页面', this.__route__)
      },
      data: {
        ex1: 'extend 1: 我是混入到所有页面中的值'
      },
      ex1Func() {
        console.log('extend 1： ex1Func 函数被调用了，调用页面是 ', this.__route__)
        return '这是一个来自 extend 1 的函数的返回值'
      },
    }
  },

  // extend 2
  {
    App: {
      onLaunch() {
        console.log('extend 2： App启动啦')
      },
      globalData: {
        globalEx2: 'extend 2: 我是混入到全局变量中的值'
      },
    },
    Page: {
      onLoad() {
        console.log('extend 2： 加载页面', this.__route__)
        console.log('extend 2： 调用ex1中的 ex1Func 函数')
        const res = this.ex1Func()
        console.log('extend 2： ex1Func 返回结果是： ', res)
      },
      data: {
        ex2: 'extend 2: 我是混入到所有页面中的值'
      },
      onPullDownRefresh() {
        console.log(this.__route__, '下拉刷新')
      }
    },
    Component: {
      created() {
        console.log('创建组件了', this.is)
      }
    }
  }
]