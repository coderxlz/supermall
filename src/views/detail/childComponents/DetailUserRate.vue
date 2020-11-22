<template>
  <div class="detailUserRate" >

    <div class="title">
      <div>用户评价</div>
      <div>更多</div>
    </div>

    <div v-if = 'showComment'>

        <div v-if="detailUserInfo.list[0]" class="base">
          <img :src="detailUserInfo.list[0].user.avatar" alt="">
          <span class="userName">{{detailUserInfo.list[0].user.uname}}</span>
        </div>

        <div v-if="detailUserInfo.list" class="commentInfo">

          <div class="content">{{detailUserInfo.list[0].content}}</div>

          <!--    使用过滤器将|左边数据作为参数传递进showDate      -->
          <span class="date font">{{detailUserInfo.list[0].created | showDate}}</span>
          <span class="font">{{detailUserInfo.list[0].style}}</span>

          <div class="commentImages">
            <img  v-for="(item,index) in detailUserInfo.list[0].images"
                  :key="index"
                  :src="item" alt=""></div>

        </div>

      </div>

    <span v-else>暂无评论</span>

  </div>

</template>

<script>
import {formatDate} from '../../../tools/utils'
export default {
name: "DetailUserRate",
  props:{
    detailUserInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    showComment(){
      if(this.detailUserInfo.cRate)
      return this.detailUserInfo.cRate;
    }
  },
  //使用过滤器格式化服务器时间戳数据
  filters:{
    showDate(date){
      //使用Date对象将时间戳转换为毫秒，调用formatDate方法
      let time = new Date(date*1000);
      return formatDate(time,'yyyy-MM-dd hh:mm');
    }
  }
}
</script>

<style scoped>

  .detailUserRate{
    padding: 0 10px;
    background-color: #fff;
    border-top: solid 10px rgb(242,245,248);
    border-bottom: 3px solid rgb(242,245,248);
  }

  .title{
    display: flex;
    justify-content: space-between;
    padding:10px 0;
  }

  .base{
    line-height: 40px;
    font-size: var(--font-size);
    padding: 10px 5px;
  }

  .base img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    /*使用vertical-align去除图片底部默认距离*/
    vertical-align: bottom;
    margin-right: 10px;
  }

  .content{
    padding-bottom: 20px;
  }

  .date{
    margin-right: 10px;
    color: var(--color-text);
  }

  .font{
    font-size: 10px;
  }

  .commentInfo{
    padding-bottom: 10px;
  }

  .commentImages{
    padding: 10px 0;
  }

  .commentImages img{
    width: 50px;
    height: 50px;
    margin: 0 10px;
  }
</style>