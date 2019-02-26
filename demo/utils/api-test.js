// 测试所用的接口
import {formatTime} from './util.js'
export default function (number, name){
  console.log('开始模拟请求数据：', name)
  
  const delay = 1000;
  return new Promise(resolve=>{
    setTimeout(()=>{
      let res = [];
      for(let i = 0; i < number; i++){
        res.push(`${name} 测试数据${i}: ${formatTime(new Date())}`);
      }
      resolve(res);
      console.log('结束模拟请求数据：', name)
    },delay);
  })
}