// 用于创建一个缓存，避免临时的data对象占用过多内存
export default function(storageName){
  const storageData = wx.getStorageSync(storageName) || null
  return {

  }
}