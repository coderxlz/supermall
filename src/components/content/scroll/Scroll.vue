<template>
  <div class="wrap" ref="wrap">
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
      this.$emit('ifShowBack',this.yPosition);
    });

    this.bScroll.on('pullingUp',() => {
      console.log('上拉加载更多');
      //完成上拉之前进行数据请求
      this.$emit('getMoreData');
      //加载完成数据之后调用betterScroll对象refresh方法，刷新数据，重新计算内容区高度

      //使用setTimeout函数防止频繁执行下拉事件
      setTimeout(() => {
        this.bScroll.finishPullUp();
      },300);

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
  .wrap{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }

</style>