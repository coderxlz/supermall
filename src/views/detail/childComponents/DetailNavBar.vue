<template>
    <nav-bar class="detailNavBar">

        <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>

        <div slot="center" class="lists">

            <div @click="changeIndex(index)" v-for="(item,index) in lists" :class="{active:currentIndex === index}"  >
              {{item}}
            </div>

        </div>

      <div slot="right"></div>
    </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
name: "detailNavBar",
  components: {NavBar},
  data(){
    return{
      lists:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    changeIndex(index){
      this.currentIndex = index;
      //顶部导航栏发生点击事件时，向详情页发送事件'goDest'，同时传递索引值index
      this.$emit('goDest',index);
    },

    backClick(){
      this.$router.back();//或者使用this.$router.go(-1);
    }
  },
  // watch:{
  //   currentIndex(){
  //     console.log('currentIndex改变为'+this.currentIndex);
  //   }
  // }
}
</script>

<style scoped>
  .detailNavBar{
    position: fixed;
    z-index: 9;
    background-color: #fff;
  }

  .lists{
    display: flex;
    flex: 1;
    justify-content: space-around;
    font-size: var(--font-size);
    line-height: 44px;
  }

  .active{
    color: var(--color-high-text);
  }

  .back{
    color: black;
    margin-top: 8px;
  }
</style>