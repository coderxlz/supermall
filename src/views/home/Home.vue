<template>
  <div>
    <nav-bar class="navbar">
      <slot slot="center"><span>购物街</span></slot>
    </nav-bar>

    <tab-control
        :tabs = 'tabs' @productChange="productChange"
        class="tabCon"
        ref = tab1
        v-show="showTabControl"
        @beforeChange="beforeChange"></tab-control>

   <scroll ref="scroll"
           @ifShowBack = 'ifShowBack'
           @getMoreData = 'getMoreData'
           id="scrollWrap">
        <home-swiper :my-banners="banners" @swiperDone = 'swiperDone'></home-swiper>
        <recommend :recommends="recommends"></recommend>
        <image-view></image-view>
        <tab-control :tabs = 'tabs'
                     @productChange="productChange"
                     ref = 'tab2'
                     @beforeChange="beforeChange"></tab-control>
        <product-wrap :pro-lists="showProduct" class="productWrap"></product-wrap>
   </scroll>
    <!--使用native给组件绑定原生事件-->
    <back-top @click.native="backClick" v-show="ifShow" ref="top"></back-top>
  </div>
</template>

<script>
//轮播图
import HomeSwiper from './childcomponents/HomeSwiper';
import Recommend from "./childcomponents/Recommend";
import TabControl from "../../components/content/tabControl/TabControl";
import ProductWrap from "../../components/content/product/ProductWrap";
import NavBar from "components/common/navbar/NavBar";
//引入图片组件
import ImageView from "./childcomponents/ImageView";
//引入滚动相组件
import Scroll from "../../components/content/scroll/Scroll";
//网络请求相关
import {getHomeMultiData,getControlMultiData} from "network/home";

//引入混入对象
import {mixin,backTop} from "../../tools/mixin";

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
  //使用混入对象
  mixins:[mixin,backTop],
  data(){
    return {
      banners:[],
      recommends:[],
      tabs:['流行','新款','精选'],
      controlData:{
        'pop':{
          page:0,
          list:[],
          scrollPos:509
        },
        'new':{
          page:0,
          list:[],
          scrollPos:509
        },
        'sell':{
          page:0,
          list:[],
          scrollPos:509
        }
      },
      //保存目前显示的商品类型
      currentType:'pop',
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

  //Home组件被keep-alive包裹，可以使用deactivated，离开Home页面时，取消对全局事件刷新的监听
  //$bus.$off('取消事件名称','对应回调函数')
  deactivated() {
    this.$bus.$off('timeToRefresh',this.itemRefresh);
  },
  methods:{
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

    //在改变商品类别之前，将原页面的滚动距离保存下来
    beforeChange(beforeIndex){
      switch (beforeIndex) {

        case 0:this.controlData.pop.scrollPos = -this.posY;
          console.log('保存pop页面距离'+this.controlData.pop.scrollPos);
        break;

        case 1:this.controlData.new.scrollPos = -this.posY;
          console.log('保存new页面距离'+this.posY);
        break;

        case 2:this.controlData.sell.scrollPos = -this.posY;
          console.log('保存sell页面距离'+this.posY);
        break;

      }
    },

    //点击控制栏按钮时,改变当前显示的数据类型
    productChange(index){
      //实现两个控制栏状态同步，无论店家哪一个，两个控制栏的currentIndex始终保持相同
      this.$refs.tab1.currentIndex = index;
      this.$refs.tab2.currentIndex = index;


      switch (index) {

        case 0: this.currentType = 'pop';
        //在跳转到其他类别之前，保存当前类别滚动距离
        this.$refs.scroll.bScroll.scrollTo(0,-this.controlData.pop.scrollPos);
        break;

        case 1: this.currentType = 'new';
          this.$refs.scroll.bScroll.scrollTo(0,-this.controlData.new.scrollPos);
          break;

        case 2: this.currentType = 'sell';
          this.$refs.scroll.bScroll.scrollTo(0,-this.controlData.sell.scrollPos);
          break;

      }
    },

    //回到顶部事件,通过ref拿到scroll对象，调用scroll对象中的方法
    backClick(){
      this.$refs.scroll.backTop(0,0,300);
    },

    // 控制backTop按钮是否显现
    ifShowBack(yPosition){
      this.scrollPosition = Math.abs(yPosition);
      //记录当前页面y方向滚动距离
      this.posY = yPosition;
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
      console.log('首页内容高度刷新');
    },
    //父组件接受处理轮播图图片加载完成事件，将控制栏offsetTop保存起来
    swiperDone(){
      //使用$refs来获得组件，并结合$el来获取组件中的元素
      this.tabOffsetTop  = this.$refs.tab2.$el.offsetTop ;
      console.log(this.tabOffsetTop);
    }

  },
  computed:{
    //显示商品
    showProduct(){
      //在把显示列表中的商品信息传递过去的同时将当前商品类型传递过去，与v-for中的key进行拼接，
      //便于vue区分不同类型的key
      console.log('------------',this.currentType);
      this.controlData[this.currentType].list.proType = this.currentType;
      return this.controlData[this.currentType].list;
    },

    //滚动到一定距离后显示控制栏
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

  .tabCon{
    position: relative;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 9;
  }

  #scrollWrap{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
</style>
