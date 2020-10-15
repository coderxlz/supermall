<template>
  <div class="recommend">
    <recommend-item v-for = 'item in recommends'>
      <slot slot="ico" >
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </slot>
      <slot slot="title">
        <div><a :href="item.link">{{item.title}}</a></div>
      </slot>
    </recommend-item>
  </div>
</template>

<script>
import RecommendItem from "./RecommendItem";
export default {
name: "Recommend",
  components:{
  RecommendItem
  },
  props:{
  recommends:{
    type:Array,
    default(){
      return []
    }
  }
  }
}
</script>

<style scoped>
  .recommend{
    text-align: center;
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    border-bottom: 8px solid #eee;
  }

  .recommend img{
    width: 65px;
    height: 65px;
    margin-top: 8px;
  }
</style>