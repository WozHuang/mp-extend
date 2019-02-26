// 测试 mp-extend的基本功能
export default [
  // extend 1
  {
    Page: {
      data: {
        ex1: '我是extend-data1混入到所有页面中的值'
      }
    }
  },

  // extend 2
  {
    Page: {
      data: {
        ex2: '我是extend-data2混入到所有页面中的值'
      }
    }
  }
]