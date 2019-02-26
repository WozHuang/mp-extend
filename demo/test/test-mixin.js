// 测试mp-extend.mixin
const mpe = require('../mp-extender/mp-extend.js')
const { mixin } = mpe

!function test1() {
  let o = { a: 1 }
  let mix1 = { b: 2 }
  let mix2 = { c: 3 }
  mixin(o, mix1, mix2)
  console.assert(o.a === 1)
  console.assert(o.b === 2)
  console.assert(o.c === 3)
}()

!function test2() {
  let o = { 
    data:{a:1,b:2}
  }
  let mix1 = {
    data: { c: 3 }
  }
  let mix2 = {
    data: { b: 4 }
  }
  mixin(o, mix1, mix2)
  console.assert(o.data.a === 1)
  console.assert(o.data.b === 4)
  console.assert(o.data.c === 3)
}()