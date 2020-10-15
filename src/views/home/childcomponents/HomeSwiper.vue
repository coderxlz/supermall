<template>
  <swiper>
    <swiper-item v-for="(item,index) in myBanners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
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
  }
}
</script>

<style scoped>

</style>