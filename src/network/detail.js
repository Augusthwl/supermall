import { request } from "./request"
export function getDetail(iid){
    return request({
        url:'/detail',
        params:{
           iid
        }
    })
}

export function getRecommend(){
    return request({
        url:'/recommend'
    })
}
//商品信息
export class Goods{
    constructor(itemInfo, columns, services){
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        // this.price = itemInfo.price
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

//商铺信息
export class Shop {
	constructor(shopInfo) {
	    this.shopLogo = shopInfo.shopLogo;
		this.name = shopInfo.name;
		this.score = shopInfo.score;
		this.cSells = shopInfo.cSells;
		this.cGoods = shopInfo.cGoods;
	}
}

//参数信息
export class GoodsParam {
	constructor(info, rule) {
        //images 可能没有值（某些商品有，某些商品没有）
        this.image = info.images ? info.images[0] : '';
	    this.info = info.set;
		this.rule = rule.tables;
	}
}