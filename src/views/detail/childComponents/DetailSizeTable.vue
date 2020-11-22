<template>

    <div class="infoTable">
<!-- 使用表格时加上table标签 -->
      <table>

        <tr v-for="(item,index) in sizeInfo" :key="index">
          <td v-for="(list,index) in item" :key="index">{{list}}</td>
        </tr>
      </table>

      <table class="patternInfo">
        <tr v-for="(item,index) in patternInfo" :key="index">
          <td  v-for="(list,index) in item" :key="index">{{list}}</td>
        </tr>
      </table>

    </div>

</template>

<script>
export default {
  name: "DetailSizeTable",
  props:{
        detailSizeInfo:{
          type:Object,
          default(){
            return{}
          }
        }
  },
  computed:{
    sizeInfo(){
      //异步数据先显示初始数据，再显示带数据的数据，
      //此处detailSizeInfo为异步数据，异步数据先显示初始数据，即设置的{}，
      //然后再显示为从props中传过来的数据，因此如果不加以判断，控制带会报undefined错误
      if(this.detailSizeInfo.rule){
        return this.detailSizeInfo.rule.tables[0];
      }
    },
    patternInfo(){
      if(this.detailSizeInfo.info)
      return this.detailSizeInfo.info.set;
    }
  }
}
</script>

<style scoped>
  .infoTable{
    width: 300px;
    background-color: #fff;
    margin: 0 auto;
    color: var(--color-text);
    font-size: var(--font-size);
  }

  .infoTable table{
    width: 100%;
    text-align: left;
  }

  .infoTable tr, th ,td{
    width: 50px;
    padding: 5px 0;
  }

  .patternInfo{
    padding-top: 20px;
  }
</style>