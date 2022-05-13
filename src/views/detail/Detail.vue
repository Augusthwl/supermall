<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
    <detail-swiper :topImgs="topImgs"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info :paramInfo="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from'./childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo.vue'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'
export default {
  name:"Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo
  },
  data(){
      return{
          iid: null,
          topImgs: null,
          goods:{},
          shop:{},
          detailInfo:{},
          paramInfo:{}
      }
  },
  created(){
    //1.保存传入的 iid
      this.iid = this.$route.params.id

    //2.根据 iid 请求新的数据
    getDetail(this.iid).then(res=>{
      console.log(res);
      const data = res.result
      //1.获取轮播图数据
      this.topImgs = data.itemInfo.topImages
      //2.获取商品详情
			this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //3.获取商铺信息
      this.shop = new Shop(data.shopInfo)
      //4.获取商品详细信息
      this.detailInfo = data.detailInfo
      //5.保存参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
#detail{
		height: 100vh;
		background-color: #fff;
		position: relative;
		z-index: 10;
}
.content{
  position:absolute;
  top: 44px;
  left: 0;
  bottom:0;
}
.detail-nav{
  position:relative;
  background-color: #fff;
  z-index: 10;
}
</style>