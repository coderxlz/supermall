<template>
  <div class="bottomBuyBar">
    <div class="totalPrice">
      <!--   全选按钮的初始选中状态由购物车中商品个数决定，如果有商品，默认全选，全选按钮为选中状态   -->
      <radio-button ref="selectAll"
                    @click.native="allChecked"
                    :ifChecked = '$store.state.carItems.length>0'/>全选
      <span>合计：￥{{totalPrice}}</span>
    </div>
    <div class="calc">去计算({{itemLength}})</div>
  </div>
</template>

<script>
//从vuex中引入mapGetters
import {mapGetters} from 'vuex'
import RadioButton from "components/content/radioButton/RadioButton";
export default {
  name: "BottomBuyBar",
  components: {RadioButton},
  computed:{
    ...mapGetters([
      'totalPrice',
        'itemLength'
    ])
  },
  methods:{
    //点击全选按钮时，设置所有商品对象中的checked属性为true
    allChecked(){
      this.$store.commit('allChecked',this.$refs.selectAll.check);
    }
  },
  mounted() {
    this.$bus.$on('timeToChecked',() => {
      if(this.$refs.selectAll)
      this.$refs.selectAll.check = true;
    })

    this.$bus.$on('noChecked',() => {
      if(this.$refs.selectAll)
      this.$refs.selectAll.check = false;
    })
  }
}
</script>

<style scoped>
  .bottomBuyBar{
    width: 100%;
    height: 44px;
    line-height: 44px;
    position: fixed;
    bottom: 49px;
    background-color: red;
    display: flex;
  }

  .totalPrice{
    display: flex;
    align-items: center;
    flex-grow: 4;
    background-color: rgb(238,238,238);
  }

  .totalPrice span{
    padding-left: 5px;
    width: 150px;
  }

  .calc{
    flex-grow: 1;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>