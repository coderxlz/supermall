<template>
  <div ref="wrap" class="wrap">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll';
export default {
name: "Scroll",
  data(){
    return{
      myScroll:{},
      yPosition:0,
      bScroll:{}
    }
  },
  mounted() {
    //初始化betterScroll对象
    this.bScroll = new BetterScroll('.wrap',{
      click:true,
      probeType:3,
      pullUpLoad:true
    });

    this.bScroll.on('scroll',(position) => {
      this.yPosition = position.y;
      // console.log(position.y);
      this.$emit('ifShowBack',this.yPosition);

      //将y轴距离实时船到detail页面之中
      this.$emit('changeTabControl',this.yPosition);
    });

    this.bScroll.on('pullingUp',() => {
      console.log('上拉加载更多');
      //home主页完成上拉之前进行数据请求
      this.$emit('getMoreData');

      //使用setTimeout函数防止频繁执行下拉事件
      //每3s只能触发一次下拉
      setTimeout(() => {
        this.bScroll.finishPullUp();
      },3000);

    });

  },
  methods:{
    //传给betterScroll对象方法scrollTo的三个参数，分别为x,y,time，time默认值为300
    backTop(x,y,time=300){
      this.bScroll.scrollTo(x,y,time);
    }
  }

}
</script>

<style scoped>

</style>