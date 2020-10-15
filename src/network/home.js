//home首页中很可能存在有多个url请求，全部放在首页会使首页高度耦合
//在首页和网络请求之间多增加一层，对首页所有请求的url进行统一的管理
// 以后首页的开发都会面向home.js进行开发
import {request} from "./request";

export function getHomeMultiData(){
  return request({
    url:'/home/multidata'
  })
}

export function getControlMultiData(getType,getPage){
  return request({
    url:'/home/data',
    params:{
      type:getType,
      page:getPage
    }
  })
}