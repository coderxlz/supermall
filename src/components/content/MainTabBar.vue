<template>
  <div>
    <TabWrap>
      <tab-bar-item  path="/home" setColor = 'red'>
        <img slot = "img1" src="../.././assets/img/tabbar/home.svg" alt="">
        <img slot = "img2" src="../.././assets/img/tabbar/home_active.svg" alt="">
        <div slot = "tag">首页</div>
      </tab-bar-item>

      <tab-bar-item  path="/category" setColor = 'red'>
        <img slot = "img1" src="../.././assets/img/tabbar/category.svg" alt="">
        <img slot = "img2" src="../.././assets/img/tabbar/category_active.svg" alt="">
        <div slot = "tag">分类</div>
      </tab-bar-item>

      <tab-bar-item  path="/shop" setColor = 'red'>
        <img slot = "img1" src="../.././assets/img/tabbar/shopcart.svg" alt="">
        <img slot = "img2" src="../.././assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot = "tag">购物车</div>
      </tab-bar-item>

      <tab-bar-item  path="/profile" setColor = "red">
        <img slot="img1"  src="../.././assets/img/tabbar/profile.svg" alt="">
        <img slot="img2"  src="../.././assets/img/tabbar/profile_active.svg" alt="">
        <div slot="tag">我的</div>
      </tab-bar-item>
    </TabWrap>
  </div>
</template>

<script>
import TabWrap from "../common/TabWrap";
import TabBarItem from "../content/TabBarItem";
export default {
  name: "MainTabBar",
  components:{
    TabWrap,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
