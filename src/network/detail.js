import {request} from "./request";

export function getDetailMultiData(iid){
  return request({
    url:'/detail',
    params:{
      iid:iid
    }
  })
}

export function getRecommendData(){
  return request({
    url:'/recommend'
  })
}

export class ItemInfo{
  constructor(itemInfo,columns,services) {
    //品名
    this.title = itemInfo.title;
    //目前价格
    this.price = itemInfo.price;
    //原价
    this.oldPrice = itemInfo.oldPrice;
    //促销标签
    this.discountDesc = itemInfo.discountDesc;
    //促销标签颜色
    this.discountDescColor = itemInfo.discountBgColor;
    //销量和收藏，对应数组中第一个和第二个元素
    this.columns = columns;
    //退货补运费
    this.services = services;
  }
}

export class ShopInfo{
  constructor(shopInfo,score) {
    //店铺图标
    this.shopLogo = shopInfo.shopLogo;
    //店名
    this.name = shopInfo.name;
    //销量
    this.cSells = shopInfo.cSells;
    //全部商品数量
    this.cGoods = shopInfo.cGoods;
    //店铺评分
    this.scores = score;
    //店铺链接
    this.shopUrl = shopInfo.shopUrl;
  }
}