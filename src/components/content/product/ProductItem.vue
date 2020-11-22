<template>
  <div class="productItem" @click="productClick">
      <a href="javascript:">
          <div class="imgDiv">
            <img  v-if="itemData.show" v-lazy="itemData.show.img" alt="" class="itemImage" @load="loadOK">
            <img  v-if="itemData.image" v-lazy="itemData.image" alt="" class="itemImage" @load="loadOK">
          </div>
          <div><span class="itemTitle">{{itemData.title}}</span></div>
          <div class="textData">
            <span>{{itemData.price}}</span>
            <span class="icon"></span>
            <span class="favorite">{{itemData.cfav}}</span>
          </div>
      </a>
  </div>

</template>

<script>

export default {
name: "Product",
  props:{
    itemData:{
      type:Object,
      default(){
        return {}
      }
    }
  },

  methods:{
  loadOK(){
  //  图片加载完成，往事件总线中发射事件，要求refresh
    this.$bus.$emit('timeToRefresh');
  },
    //点击商品时，进入详情页面
    productClick(){
      this.$router.push('/detail/'+this.itemData.iid);
    }
  }

}
</script>

<style scoped>
  .productItem{
    width: 46%;
    text-align: center;
    box-shadow: 1px 1px 1px rgba(0,0,0,.1);
  }


  .itemImage{
    width: 100%;
    border-radius: 5px;
  }

  .itemTitle{
    display: inline-block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
  }

  .textData{
    font-size: 14px;
  }

  .icon{
    display: inline-block;
    width: 14px;
    height: 14px;
    background-image: url("../../../assets/img/common/collect.svg");
    background-size: contain;
    margin-left: 10px;
  }
</style>