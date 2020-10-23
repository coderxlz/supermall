export default {
  addProduct(context,payload){
    //使用数组的find方法，数组中每个元素都会进行一次测试，返回true测试通过时
    //返回测试通过的第一个元素
    let product = context.state.carItems.find(item => item.iid === payload.iid);

    return new Promise((resolve,reject) => {
      if(product){
        context.commit('addCount',product);
        resolve('商品数量加一');
      }else{
        context.commit('addNew',payload);
        resolve('商品已加入购物车');
      }
    })
  }
}