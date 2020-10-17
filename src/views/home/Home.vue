<template>
  <div>
    <nav-bar class="navbar">
      <slot slot="center">购物街</slot>
    </nav-bar>

    <tab-control
        :tabs = 'tabs' @productChange="productChange"
        class="tabCon"
        ref = tab1
        v-show="showTabControl"></tab-control>

   <scroll ref="scroll" @ifShowBack = 'ifButtonShow' @getMoreData = 'getMoreData'>
        <home-swiper :my-banners="banners" @swiperDone = 'swiperDone'></home-swiper>
        <recommend :recommends="recommends"></recommend>
        <image-view></image-view>
        <tab-control :tabs = 'tabs' @productChange="productChange" ref = 'tab2'></tab-control>
        <product-wrap :pro-lists="showProduct" class="productWrap"></product-wrap>
   </scroll>
    <!--使用native给组件绑定原生事件-->
    <back-top @click.native="backClick" v-show="ifShow"></back-top>
  </div>
</template>

<script>
//轮播图
import HomeSwiper from './childcomponents/HomeSwiper';
import Recommend from "./childcomponents/Recommend";
import TabControl from "../../components/content/tabControl/TabControl";
import ProductWrap from "../../components/content/product/ProductWrap";
import BackTop from "../../components/content/backtop/BackTop";
import NavBar from "components/common/navbar/NavBar";
//引入图片组件
import ImageView from "./childcomponents/ImageView";
//引入滚动相组件
import Scroll from "../../components/content/scroll/Scroll";
//网络请求相关
import {getHomeMultiData,getControlMultiData} from "network/home";
//引入防抖函数
import {debounce} from "../../tools/utils";

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
      //保存目前显示的商品类型
      currentType:'pop',
      //ifShow用来保存置顶图标是否显示
      ifShow:false,
      //定义_this，存储this对象
      _this:{},
      //定义tabOffset,存储控制栏偏移距离
      tabOffsetTop:0,
      //定义数据，保存滚动的y偏移量
      scrollPosition:0
    }
  },
  //在组件被创建好之后，开启异步操作进行网络请求
  created() {
    this.getHomeData();
    this.getControlData('pop',this.controlData.pop.page);
    this.getControlData('new',this.controlData.new.page);
    this.getControlData('sell',this.controlData.sell.page);
  },
  mounted() {
    //调用防抖函数
    const refresh = this.debounce(this.refreshData,300);

    // const refresh = this.throttle(this.$refs.scroll.bScroll.refresh,500);

    // 在组件挂载到页面之后才可以使用$refs属性
    // 监听item中图片加载完成
    this.$bus.$on('timeToRefresh',() => {
      refresh();
    });

  },
  methods:{
    //性能优化
    debounce,

    //第二种方法创建节流函数，避免高频执行js代码
    throttle(func,delay){
      let timer = null;

      return function(...args){
        let aaa = this;
        if(timer){
          //如果存在timer，即存在计时器，返回不继续执行
          return;
        }
        timer = setTimeout(() => {
          func.call(aaa);
          //进入计时器执行完一次刷新之后，清楚计时器
          timer = null;
        },delay)
      }
  },

    //获得信息栏数据
    getHomeData(){
      getHomeMultiData().then(res => {
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
      //实现两个控制栏状态同步，无论店家哪一个，两个控制栏的currentIndex始终保持相同
      this.$refs.tab1.currentIndex = index;
      this.$refs.tab2.currentIndex = index;

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
    ifButtonShow(yPosition){
      this.scrollPosition = Math.abs(yPosition);
      this.ifShow = yPosition<=-1000;
    },

    //  上拉刷新时，获取更多数据
    getMoreData(){
      console.log('------------'+this.currentType)
      this.getControlData(this.currentType,this.controlData[this.currentType].page);
      this.refreshData();
    },

    refreshData(){
      //使用这种写法可以避免在bScroll组件还没被创建的时候就被调用refresh方法
      this.$refs.scroll && this.$refs.scroll.bScroll.refresh();
    },
    //父组件接受处理轮播图图片加载完成事件，将控制栏offsetTop保存起来
    swiperDone(){
      this.tabOffsetTop  = this.$refs.tab2.$el.offsetTop ;
      console.log(this.tabOffsetTop);
    }

  },
  computed:{
    //显示商品
    showProduct(){
      return this.controlData[this.currentType].list;
    },

    //显示控制栏
    showTabControl(){
      return this.scrollPosition >= this.tabOffsetTop;
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

  .tabCon{
    position: relative;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 9;
  }

</style>
