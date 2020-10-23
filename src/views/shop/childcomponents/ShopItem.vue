<template>

  <div class="shopItem" v-if="itemData.length !== 0">
    <div class="itemWrap" v-for="item in itemData">

      <radio-button :ifChecked = 'item.checked'
                    @click.native="changeState(item)"/>

      <div >
        <img class="itemImg" :src="item.imgurl" alt="">
      </div>

      <div>
        <div class="title">{{item.title}}</div>
        <div class="desc">{{item.desc}}</div>

        <div class="priceCount">
          <div class="price">￥{{item.price}}</div>
          <div>x{{item.count}}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import RadioButton from "components/content/radioButton/RadioButton";

export default {
  name: "ShopItem",
  components: {RadioButton},
  data(){
    return {
      itemData:[]
    }
  },
  mounted() {
    //获得购物车商品数据
    this.itemData = this.$store.state.carItems;
  },
  methods:{
    //改变商品对象属性中的checked状态
    changeState(obj){
      obj.checked = !obj.checked;
    //每次点击商品单选按钮时，进行检查，如果所商品都被选中，则全选键选中
      if(!this.$store.getters.allChecked){
        console.log('全部选中');
        this.$bus.$emit('timeToChecked');
      }else{
        this.$bus.$emit('noChecked');
      }
    }
  },


}
</script>

<style scoped>
  .itemWrap{
    display: flex;
    justify-content: space-around;
    padding: 10px 5px;
    border-bottom: 1px solid rgb(236,236,236);
    align-items: center;
  }

  .itemImg{
    width: 80px;
    height: 120px;
    border-radius: 20%;
  }

  .title,.desc{
    width: 200px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .title{
    font-size: var(--font-size);
  }

  .desc{
    font-size: 10px;
    color: var(--color-text);
    padding: 30px 0;
  }

  .priceCount{
    display: flex;
    justify-content: space-between;
    position: relative;
    bottom: 0;
  }

  .price{
    color: red;
  }
</style>