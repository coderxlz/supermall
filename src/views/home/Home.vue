<template>
  <div>
    <nav-bar class="navbar">
      <slot slot="center">购物街</slot>
    </nav-bar>

   <scroll ref="scroll" @ifShowBack = 'ifButtonShow' @getMoreData = 'getMoreData'>
        <home-swiper :my-banners="banners"></home-swiper>
        <recommend :recommends="recommends"></recommend>
        <image-view></image-view>
        <tab-control :tabs = 'tabs' @productChange="productChange"></tab-control>
        <product-wrap :pro-lists="showProduct" class="productWrap"></product-wrap>
   </scroll>
<!--使用native给组件绑定原生事件-->
    <back-top @click.native="backClick" v-show="ifShow "></back-top>
  </div>
</template>

<script>
import BackTop from "../../components/content/BackTop";
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
    BackTop,
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
      currentType:'pop',
      ifShow:false
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

    //获得服装数据
    getControlData(getType,getPage){
      getPage = this.controlData[getType].page+1;
      getControlMultiData(getType,getPage).then(res => {
        console.log(res);
        //将请求得到的数据与原数据进行拼接
        this.controlData[getType].list = this.controlData[getType].list.concat(res.data.data.list);
        console.log(this.controlData[getType].list);
        this.controlData[getType].page += 1;
      }).catch(err => {
        console.log(err);
      })
    },
    //点击控制栏按钮时,改变当前显示的数据类型
    productChange(index){
      switch (index) {
        case 0: this.currentType = 'pop';break;

        case 1: this.currentType = 'new';break;

        case 2: this.currentType = 'sell';break;

      }
    },

    /*回到顶部事件,通过ref拿到scroll对象，调用scroll对象中的方法*/
    backClick(){
      this.$refs.scroll.backTop(0,0,300);
    },

   // 控制backTop按钮是否显现
    ifButtonShow(bool){
      this.ifShow = bool;
    },

  //  上拉刷新时，获取更多数据
    getMoreData(){
      console.log('------------'+this.currentType)
      this.getControlData(this.currentType,this.controlData.pop.page);
      this.$refs.scroll.bScroll.refresh();
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
