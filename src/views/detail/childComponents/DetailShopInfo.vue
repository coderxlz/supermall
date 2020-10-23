<template>
  <div class="shopInfo">

    <div class="shopHead">
      <img :src="shopInfo.shopLogo" alt="">
      <span class="shopName">{{shopInfo.name}}</span>
    </div>

    <div class="sellInfo">

      <div class="wrap" id="left">

        <div class="leftDiv">
          <div>{{totalSells}}</div>
          <div class="sellFont">总销量</div>
        </div>

        <div class="allItems leftDiv" >
          <div>{{shopInfo.cGoods}}</div>
          <div class="sellFont">全部宝贝</div>
        </div>

      </div>

      <div class="wrap" id = "right">
          <div v-for="item in shopInfo.scores">
            <span class="sellFont">{{item.name}}</span>
            <span class="scores" :class="{active:item.isBetter}">{{item.score}}</span>
            <span v-if="item.isBetter" class="sellFont high">高</span>
            <span v-else class="sellFont low">低</span>
          </div>
      </div>
    </div>

    <a :href="shopInfo.shopUrl">
      <span class="inShop">
      进店逛逛
    </span>
    </a>

  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props:{
    shopInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    //格式化商品总销量
    totalSells(){
      let total = this.shopInfo.cSells;
      if(total<=10000){
        return total;
      }else{
        return (total/10000).toFixed(1)+'万';
      }

    }
  },

}
</script>

<style scoped>
  .shopInfo{
    padding: 25px 5px;
    border-top: 10px solid rgb(252,252,252);
    border-bottom: 10px solid rgb(242,245,248);
  }

  .shopHead{
    height: 40px;
    line-height: 40px;

  }

  .shopHead img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    /*注意:使用vertical-align清楚图片底部距离*/
    vertical-align: bottom;
  }

  .shopName{
    margin-left: 10px;
    font-size: var(--font-size);
  }

  .sellInfo{
    display: flex;
    padding-top: 30px;
  }

  #left{
    display: flex;

    justify-content: space-around;
    text-align: center;
    align-items: center;
  }

  .leftDiv{
    flex-grow: 1;
  }

  .allItems{
    border-right: 1px solid rgb(229,229,229);
  }

  .wrap{
    width: 50%;
  }

  #right{
    padding:0 20px;
  }

  .sellFont{
    font-size: 12px;
  }

  .scores{
    display: inline-block;
    padding:0 5px;
    width: 40px;
    font-size: 10px;
    color: green;
  }

  .active{
    color: red;

  }

  .high{
    background-color: red;
    color: white;
  }

  .low{
    background-color: rgb(94,167,50);
    color: white;
  }

  .inShop{
    width: 100px;
    text-align: center;
    display: block;
    margin: 10px auto 0 auto;
    background-color: rgb(242,245,248);
    border-radius: 20%;
  }
</style>