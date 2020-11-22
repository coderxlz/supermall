<template>
  <div class="detailBottomBar">

    <div class="leftBar">
      <div>
        <div id="service"></div>
        <span>客服</span>
      </div>
      <div>
        <div id="shop"></div>
        <span>店铺</span>
      </div>
      <div>
        <div id="star"></div>
        <span>收藏</span>
      </div>
    </div>

    <div class="rightBar">
      <div id="inShopCar" @click="addShopCar">加入购物车</div>
      <div id="buy">购买</div>
    </div>

  </div>
</template>

<script>
export default {
name: "DetailBottomBar",
  methods:{
  //将商品添加进购物车
    addShopCar(){
      this.$emit('addProduct');
    }
  }
}
</script>

<style scoped>
  .detailBottomBar{
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 59px;
    line-height: 59px;
    text-align: center;
    display: flex;
    background-color: #fff;
    bottom: 0;
  }

  .leftBar ,.rightBar{
    display: flex;
    width: 100%;
    flex-grow: 1;
    justify-content: space-evenly;
  }

  .leftBar div{
    flex-grow: 1;
  }

  .leftBar{
    font-size: 12px;
  }

  .rightBar{
    font-size: 14px;
  }

  #inShopCar{
    background-color: rgb(255,232,23);
    width: 50%;
  }

  #buy{
    background-color: rgb(255,102,153);
    width: 50%;
    color: #fff;
  }

</style>