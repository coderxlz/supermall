<template>
  <div class="productItem">
        <a :href="itemData.link">
          <div class="imgDiv"><img :src="itemData.show.img" alt="" class="itemImage"></div>
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
  }
}
</script>

<style scoped>
  .productItem{
    width: 150px;
    height: 263px;
    margin: 2px 0;
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
    background-image: url("../../assets/img/common/collect.svg");
    background-size: contain;
    margin-left: 10px;
  }
</style>