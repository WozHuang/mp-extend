// 测试mp-extend.decorate
const mpe = require('../mp-extender/mp-extend.js')
const { decorate } = mpe

!function test1(){
  const a = {
    value: 0,
    get(){
      return this.value
    }
  }
  console.assert(a.get() === 0)
  console.assert(a.color === undefined)
  const decorators = [
    function(){
      this.value = 1
    },
    function(){
      this.color = 'red'
    },
    function(){
      console.log('call function [get]')
    }
  ]
  a.get = decorate(a.get, ...decorators)
  console.assert(a.value === 0)
  console.assert(a.color === undefined)
  
  console.assert(a.get() === 1)
  console.assert(a.color === 'red')
}()