<template>
  <div>
    <nav-bar class="navbar">
      <slot slot="center">购物街</slot>
    </nav-bar>

   <scroll>
        <home-swiper :my-banners="banners"></home-swiper>
        <recommend :recommends="recommends"></recommend>
        <image-view></image-view>
        <tab-control :tabs = 'tabs' @productChange="productChange"></tab-control>
        <product-wrap :pro-lists="showProduct" class="productWrap"></product-wrap>
   </scroll>

  </div>
</template>

<script>
import BetterScroll from 'better-scroll';

import NavBar from "components/common/navbar/NavBar";

//网络请求相关
import {getHomeMultiData,getControlMultiData} from "network/home";

import HomeSwiper from './childcomponents/HomeSwiper';
import Recommend from "./childcomponents/Recommend";
import TabControl from "../../components/content/TabControl";
import ProductWrap from "../../components/content/ProductWrap";

//引入图片组件
import ImageView from "./childcomponents/ImageView";
//引入滚动相组件
import Scroll from "../../components/content/scroll/Scroll";
export default {
  name: "Home",
  components:{
    ProductWrap,
    TabControl,
    Recommend,
    NavBar,
    HomeSwiper,
    ImageView,
    Scroll
  },
  data(){
    return {
      banners:[],
      recommends:[],
      tabs:['流行','新款','精选'],
      controlData:{
        'pop':{
          page:0,
          list:[]
        },
        'new':{
          page:0,
          list:[]
        },
        'sell':{
          page:0,
          list:[]
        }
      },
      currentType:'pop'
    }
  },
  //在组件被创建好之后，开启异步操作进行网络请求
  created() {
    this.getHomeData();

    this.getControlData('pop',this.controlData.pop.page);
    this.getControlData('new',this.controlData.new.page);
    this.getControlData('sell',this.controlData.sell.page);

  },
  methods:{
    getHomeData(){
      getHomeMultiData().then(res => {
        console.log(res);
        //将请求到的数据保存到本地组件
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      }).catch(err => {
        console.log(err);
      })
    },

    getControlData(getType,getPage){
      getPage = this.controlData[getType].page+1;
      getControlMultiData(getType,getPage).then(res => {
        console.log(res);
        this.controlData[getType].list = res.data.data.list;
        this.controlData[getType].page += 1;
      }).catch(err => {
        console.log(err);
      })
    },

    productChange(index){
      switch (index) {
        case 0: this.currentType = 'pop';break;

        case 1: this.currentType = 'new';break;

        case 2: this.currentType = 'sell';break;

      }
    }

  },

  computed:{
    showProduct(){
      return this.controlData[this.currentType].list;
    }
  }

}



</script>

<style scoped>
  .navbar{
    background-color: var(--color-tint);
    color: #fff;
  }

  .productWrap{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

</style>
