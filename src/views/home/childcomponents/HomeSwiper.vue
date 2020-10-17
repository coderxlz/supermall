<template>
  <swiper>
    <swiper-item v-for="(item,index) in myBanners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperDone">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/slideshow/index'
export default {
name: "HomeSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
  myBanners:{
    type:Array,
    default(){
      return []
    }
  }
  },
  data(){
    return {
      ifLoad:false
    }
  },
  methods:{
    swiperDone(){
      //当轮播图图片加载完成时，像父组件Home中发射事件swiperDone

      //加入If判断，保证只进行一次数据发送，优化性能
      if(!this.ifLoad){
        this.$emit('swiperDone');
        this.ifLoad = true;
      }

    }
  }
}
</script>

<style scoped>

</style>