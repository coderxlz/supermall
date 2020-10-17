export function debounce(func,delay){
  let timer = null;
  let aaa = this;//保存this组件对象
  //...args表示可以传入多个参数
  return function (...args){
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.call(aaa);//让保存的组件对象调用func方法
      console.log('refresh刷新');
    },delay)
  }
}