// pages/complex/omix/oData.js
const msgs = ['mp-extend',' ——可定制',' ——易扩展']
Page({

  data: {
    msg:''
  },

  changeMsg(){
    const msg = msgs.shift();
    this.oData.msg += msg ||'。'
  }

})