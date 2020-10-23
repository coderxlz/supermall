<template>
  <div class="detail">
    <detail-nav-bar class="navBar"
                    @goDest = 'goDest'
                    ref="navBar"/>
    <Scroll class="scrollWrap"
            ref="scroll"
            @changeTabControl = 'changeTabControl'
            @ifShowBack = 'ifShowBack'>
      <detail-swiper :top-images="topImages"></detail-swiper>
      <!-- 将商品信息页面需要显示的信息通过组件通信props传递过去   -->
      <detail-item-info :itemInfo = 'itemInfo'/>
      <!-- 将店家信息页面需要显示的信息通过组件通信props传递过去   -->
      <detail-shop-info :shopInfo = 'shopInfo'/>
      <!-- 将商品详情信息通过props传递     -->
      <detail-image-info
          :detailItemInfo = 'detailItemInfo'
          @refreshData = 'refreshData'/>
      <!-- 将服装信息表中信息通过props传递     -->
      <detail-size-table
          :detailSizeInfo = 'detailSizeInfo'
          ref="sizeInfo"/>
      <!-- 将用户评价信息通过Props传递     -->
      <detail-user-rate
          :detailUserInfo = 'detailUserInfo'
          ref="comment"/>
      <!-- 商品推荐页面     -->
      <product-wrap :proLists = 'recommendData'
                    class="productWrap"
                    ref="recommend"/>
    </Scroll>
    <back-top @click.native="backClick" v-show="ifShow" ref="top"></back-top>
    <!-- 底部控制栏   -->
    <DetailBottomBar @addProduct = 'addProduct'/>
    <Toast/>
  </div>
</template>

<script>
//引入网络请求数据方法
import {getDetailMultiData,ItemInfo,ShopInfo,getRecommendData} from 'network/detail.js'

//导入各种组件
import DetailNavBar from "./childComponents/DetailNavBar";
import Scroll from "../../components/content/scroll/Scroll";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailItemInfo from "./childComponents/DetailItemInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailImageInfo from "./childComponents/DetailImageInfo";
import DetailSizeTable from "./childComponents/DetailSizeTable";
import DetailUserRate from "./childComponents/DetailUserRate";
import ProductWrap from "components/content/product/ProductWrap";
import DetailBottomBar from "./childComponents/DetailBottomBar";
import Toast from "../../components/common/Toast/Toast";
//引入混入对象
import {mixin,backTop} from "../../tools/mixin";


export default {
name: "Detail",
  //使用混入对象
  mixins:[mixin,backTop],

  components:{
    Toast,
    DetailBottomBar,
    ProductWrap,
    DetailUserRate,
    DetailSizeTable,
    DetailImageInfo,
    DetailNavBar,
    DetailSwiper,
    DetailItemInfo,
    DetailShopInfo,
    Scroll
  },

  data(){
    return{
      //保存商品所有信息
      itemAllInfo:null,
      //iid用来保存当前页面商品iid
      iid:null,
      //用来保存商品详情页轮播图图片数据
      topImages:[],
      //用来保存商品信息组件需要显示的商品信息
      itemInfo:{},
      //用来保存店铺信息
      shopInfo:{},
      //用来保存商品详情展示信息
      detailItemInfo:{},
      //用来保存商品信息表中商品信息
      detailSizeInfo:{},
      //用来保存用户评价信息
      detailUserInfo:{},
      //用来保存推荐商品信息
      recommendData:[],
      //评论组件偏移量
      comOffset:0,
      //参数组件偏移量
      sizeOffset:0,
      //推荐组件偏移量
      recOffset:0
    }
  },

  created() {
  //保存商品id
    this.iid = this.$route.params.iid;
  //网络数据请求
  if(this.iid!=null){
    getDetailMultiData(this.iid).then((res) => {
      //保存顶部轮播图数据
      this.topImages = res.data.result.itemInfo.topImages;

      //创建数据对象，将商品信息组件所需要显示的信息保存在itemInfo对象之中
      this.itemInfo = new ItemInfo(res.data.result.itemInfo,res.data.result.columns,res.data.result.shopInfo.services);

      //将店铺信息保存到shopInfo之中
      this.shopInfo = new ShopInfo(res.data.result.shopInfo,res.data.result.shopInfo.score);

      //保存商品详情信息
      this.detailItemInfo = res.data.result.detailInfo;

      //保存服装信息表中信息
      this.detailSizeInfo = res.data.result.itemParams;

      //保存用户评价信息
      this.detailUserInfo = res.data.result.rate;

      //保存商品所有信息
      this.itemAllInfo = res.data.result.itemInfo;

      //请求推荐商品数据
      getRecommendData().then(res => {
        this.recommendData = res.data.data.list;
      }).catch(err => {
        console.log(err);
      })

    }).catch((err) => {
      console.log(err);
    })
  }else{
    console.log('iid为null');
  }
  },

  //退出商品详情页时，解除对content高度刷新的监听
  destroyed() {
    this.$bus.$off('timeToRefresh',this.itemRefresh);
  },

  methods:{
    //刷新content高度
    refreshData(){
      //使用这种写法可以避免在bScroll组件还没被创建的时候就被调用refresh方法
      this.$refs.scroll && this.$refs.scroll.bScroll.refresh();

      //页面刷新之后，保存组件偏移量数据
      //offsetTop表示当前元素到其offsetParent之间的距离，而offsetParent指的是当前元素最近的开启了
      //定位的祖先元素
      this.sizeOffset = this.$refs.sizeInfo.$el.offsetTop;
      this.comOffset = this.$refs.comment.$el.offsetTop;
      this.recOffset = this.$refs.recommend.$el.offsetTop;
    },

    //点击导航栏中不同按钮时，跳转到指定位置
    goDest(index){
      switch (index){
        case 0:
          this.scroll(0);break;
        case 1:
          this.scroll(this.sizeOffset);
          break;
        case 2:
          this.scroll(this.comOffset);
          break;
        case 3:
          this.scroll(this.recOffset);
          break;
        default:
          this.scroll(0);
          break;
      }
    },

    //scroll方法
    scroll(pos){
      this.$refs.scroll.bScroll.scrollTo(0,-pos,300);
    },

    // 根据滚动的距离改变控制栏的currentType
    changeTabControl(pos){
      let Posy = Math.abs(pos);
      if(Posy<this.sizeOffset){//15814
        this.$refs.navBar.currentIndex = 0;
      }
      else if(Posy<this.comOffset){//16746
        this.$refs.navBar.currentIndex = 1;
      }else if(Posy<this.recOffset){//16960
        this.$refs.navBar.currentIndex = 2;
      }else{
        this.$refs.navBar.currentIndex = 3;
      }

    },

    //为购物车添加商品
    addProduct(){
      //封装想要购买商品的基本信息
      let product = {};
      product.iid = this.iid;
      product.title = this.itemAllInfo.title;
      product.desc = this.itemAllInfo.desc;
      product.price = this.itemAllInfo.lowNowPrice;
      product.imgurl = this.topImages[0];
      product.count = 1;
      product.checked = true;//商品默认选中状态true

      this.$store.dispatch('addProduct',product).then(res => {
        this.$toast.show(res);
      });
    }
  },



}
</script>

<style scoped>
  .detail{
    /*设置优先级将底部选项菜单盖住*/
    position: relative;
    z-index: 9;
    background-color: #fff;
    /*给外层元素detail开启相对定位同时设置高度视口高度100%*/
    height: 100vh;
  }


  .scrollWrap{
    /*通过calc计算属性将滚动的外部距离设置为100%视窗高度减去顶部导航栏宽度*/
    /*计算属性运算符号左右要留有空格，否则报错*/
    /*height: calc(100vh - 44px - 59px);*/
    position: absolute;
  /*  还可以根据绝对定位设置betterScroll外部容器的高度*/
    top: 44px;
    bottom: 59px;
  }

  .productWrap{
    padding-top: 10px;
  }
</style>