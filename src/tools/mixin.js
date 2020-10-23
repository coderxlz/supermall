import {debounce} from "./utils";
import BackTop from "../components/content/backtop/BackTop";

//创建一个混入对象
const mixin = {
  data(){
    return {
      //保存刷新事件函数
      itemRefresh:{}
    }
  },
  mounted() {
    //调用防抖函数
    const refresh = debounce(this.refreshData,300);

    // const refresh = this.throttle(this.$refs.scroll.bScroll.refresh,500);

    // 在组件挂载到页面之后才可以使用$refs属性
    // 监听item中图片加载完成

    //在mounted调用$bus.$on的原因，父子组件的渲染顺序
    //父组件created -> 子组件created -> 子组件mounted -> 父组件mounted

    //将函数储存起来，保存到this.itemRefresh属性中，hook函数deactivated中需要将此属性作为
    //参数传入从而消除对全局事件的监听
    this.itemRefresh = () => {
      refresh();
    }

    this.$bus.$on('timeToRefresh',this.itemRefresh);

  }
}

//创建混入对象，复用backTop按钮
const backTop = {
  components:{
    BackTop,
  },
  data(){
    return{
      //ifShow用来保存置顶图标是否显示
      ifShow:false,
      //保存Scroll组件传递过来的滚动值
      posY:0
    }
  },
  methods:{
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
    }
  }
}

export {mixin,backTop}