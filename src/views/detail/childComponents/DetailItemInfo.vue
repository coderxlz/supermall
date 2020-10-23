<template>
  <div class="itemInfo" v-if="Object.keys(itemInfo).length !== 0">
<!--商品信息栏第一部分-->
    <div class="itemPrice">
      <div class="title">{{itemInfo.title}}</div>
      <span class="nowPrice">{{itemInfo.price}}</span>
      <span class="oldPrice">{{itemInfo.oldPrice}}</span>
      <!-- 在显示折扣标签之前添加v-if判断，如果该商品有折扣标签则显示 -->
      <span
          v-if="itemInfo.discountDesc"
          class="discountTag"
          :style="{backgroundColor:itemInfo.discountDescColor,borderRadius:'35%'}">
        {{itemInfo.discountDesc}}
      </span>
    </div>
<!--商品信息栏第二部分-->
    <div class="sellInfo" v-if="itemInfo.columns">
      <div>{{itemInfo.columns[0]}}</div>
      <div>{{itemInfo.columns[1]}}</div>
      <div>{{itemInfo.services[1].name}}</div>
    </div>
<!--商品信息栏第三部分-->
    <div class="promise" v-if="itemInfo.services">
      <div>
        <img :src="itemInfo.services.slice(-1)[0].icon" alt="">
        {{itemInfo.services.slice(-1)[0].name}}
      </div>
      <div>
       <img :src="itemInfo.services.slice(-2,-1)[0].icon" alt="">
        {{itemInfo.services.slice(-2,-1)[0].name}}
      </div>

    </div>

  </div>
</template>

<script>
export default {
name: "DetailItemInfo",
  props:{
    itemInfo:{
      type:Object,
      default(){
        return {}
      }
    },
  }
}
</script>

<style scoped>

  .itemInfo{
    padding: 0 5px;
  }

  .itemPrice{
    padding: 8px 0px;

  }

  .title{
    font-size: var(--font-size);
    padding-bottom: 10px;
  }

  .nowPrice{
    color: red;
    font-size: 18px;
  }

  .oldPrice{
    color: var(--color-tint);
    font-size: 10px;
    text-decoration: line-through;
    padding: 0 5px;
  }

  .discountTag{
    font-size: 10px;
    display: inline-block;
    text-align: center;
    /*设置文字上标*/
    padding: 1px;
    vertical-align: super;
    color: #fff;
  }

  .sellInfo{
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: var(--color-tint);
    padding-bottom: 5px;
    border-bottom: 3px solid rgb(252,252,252);
  }

  .promise{
    display: flex;
    justify-content: space-between;
    font-size: 10px;
  }

  .promise img{
    width: 10px;
    height: 10px;
    margin-top: 5px;
  }
</style>