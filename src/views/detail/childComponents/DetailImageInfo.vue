<template>
  <div class="detailImageInfo">

    <div class="start"></div>

    <div class="comment">
      <span v-if="detailItemInfo.desc">
        {{detailItemInfo.desc}}
      </span>
      <span v-else>always the best!!!</span>
    </div>

    <div class="end"></div>

    <div v-if="detailItemInfo.detailImage">
      <div class="key">
        {{detailItemInfo.detailImage[0].key}}
      </div>
      <div v-for="item in detailItemInfo.detailImage[0].list">
        <img :src="item" alt="" @load="loadImages">
      </div>
    </div>

  </div>
</template>

<script>
export default {
name: "DetailImageInfo",
  props:{
    detailItemInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return{
      currentLoad:0,
      imagesLength:0
    }
  },
  methods:{
    //图片加载完成时
    loadImages(){
      //图片有多少张，该方法就会被调用多少次
      //当所加载的图片数量等于图片总数量时
      if(++this.currentLoad === this.imagesLength){
        console.log('图片全部加载完成，刷新事件发射');
        this.$emit('refreshData');
      }
    }
  },
  //使用watch监听detailItemInfo数据，发生变化时,更新图片长度数据
  watch:{
    detailItemInfo(){
      this.imagesLength = this.detailItemInfo.detailImage[0].list.length;
    }
  }
}
</script>

<style scoped>

  .detailImageInfo{
    padding: 10px 0;
    background-color: #fff;
  }

  .detailImageInfo img{
    width:100vw;
  }

  .comment{
    text-align: left;
    font-size: 10px;
    padding: 10px 5px;
    color: var(--font-size);
    position: relative;
  }

  .start , .end{
    width: 70px;
    height: 1px;
    background-color: #000;
    position: absolute;
    margin: 0 10px;
  }

  .end{
    right: 0;
  }

  .start::after {
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    background-color: #000;
  }

  .end::before{
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    background-color: #000;
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .key{
    padding: 10px 5px;
  }

  .comment img{
    width: 100vw;
  }

</style>