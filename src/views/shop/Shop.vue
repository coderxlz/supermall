<template>
  <div class="shop">
    <nav-bar class="navBar">
      <div slot="center">购物车({{totalItems}})</div>
    </nav-bar>

    <scroll class="scrollWrap"
            ref="scroll">
      <div>
        <shop-item/>
      </div>

    </scroll>

    <bottom-buy-bar/>
  </div>
</template>

<script>
//引入mapGetters
import {mapGetters} from 'vuex'

import ShopItem from "./childcomponents/ShopItem";
import BottomBuyBar from "./childcomponents/BottomBuyBar";
import Scroll from "../../components/content/scroll/Scroll";
import NavBar from "../../components/common/navbar/NavBar";
export default {
  name: "Shop",
  components: {NavBar, Scroll, BottomBuyBar, ShopItem},
  computed: {
    //遍历mapGetters
    ...mapGetters([
        'totalItems'
    ])
  },
  mounted() {
    //当购物车按钮被点击时，刷新betterScroll高度
    this.$bus.$on('shopCarHeightRefresh',() => {
      this.$refs.scroll.bScroll.refresh();
    })
  }
}
</script>

<style scoped>

  .navBar{
    background-color: #fff;
  }

  .shop{
    height: 100vh;
    background-color: #fff;
  }

  .scrollWrap{
    position: absolute;
    bottom: 93px;
    top: 44px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
