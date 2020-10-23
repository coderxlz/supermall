export default{
  //计算衣服总价格
  totalPrice(state){
    let total = 0;
    state.carItems.forEach(function (n){
      if(n.checked === true)
      total += n.count*n.price;
    });
    return total.toFixed(2);
  },
  //购物车商品结算数量
  itemLength(state){
    let count = 0;
    state.carItems.forEach(n => {
      if(n.checked === true)
        count++
    })
    return count;
  },
  //购物车商品总数
  totalItems(state){
    let num = 0;
    for(let item of state.carItems){
      num += item.count;
    }
    return num;
  },
  //判断购物车商品列表中商品是否都被选中
  allChecked(state){
    //寻找数组中满足条件的对象，如果存在未选中的对象，返回该对象
    if(state.carItems.length !==0 )
    return state.carItems.find(n => {
      return n.checked === false
    })
  }
}