export default {
  //已有商品数量加一方法
  addCount(state,payload){
    payload.count++;
  },

  //添加新的商品
  addNew(state,payload){
    state.carItems.push(payload);
  },

  calcAll(state){
    let total = 0;
    state.carItems.forEach(function (n){
      total += n.count*n.price;
    });
    console.log(total);
    return total.toFixed(2);
  },

  //全选方法
  //payload表示全选按钮选中状态bool值
  allChecked(state,payload){
    state.carItems.forEach(function (n){
      n.checked = payload;
    })
  }
}