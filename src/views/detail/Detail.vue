<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll"  @scroll="contentScroll" :probe-type="3">
    <detail-swiper :topImgs="topImgs"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info :param-info="paramInfo" ref="param"/>
    <detail-comment-info :comment-info="commentInfo" ref="comment"/>
    <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShow"/>
    <!-- <toast :message="message" :show="show"  /> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from'./childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from 'components/common/toast/Toast'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

export default {
  name:"Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    DetailBottomBar,
    // Toast
  },
  mixins:[itemListenerMixin, backTopMixin],
  data(){
      return{
          iid: null,
          topImgs: null,
          goods:{},
          shop:{},
          detailInfo:{},
          paramInfo:{},
          commentInfo:{},
          recommends:[],
          // itemImgListener:null,
          themeTopYs:[],
          getThemeTopY:null,
          currentIndex:0,
          // message:'',
          // show:false

      }
  },
  created(){
    //1.保存传入的 iid
    this.iid = this.$route.params.id

    //2.根据 iid 请求新的数据
    getDetail(this.iid).then(res=>{
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
      //6.获取评论信息
      if(data.rate.cRate !==0){
        this.commentInfo = data.rate.list[0]
      }
    })
    
    //3.请求 recommend 数据
    getRecommend().then(res=>{
      this.recommends = res.data.list
    })
    this.getThemeTopY = debounce(()=>{
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    },100)

    this.$nextTick(()=>{//渲染完成后回来调用一次，但是图片没有渲染完
    // console.log('nextTick')
    })

  },
  mounted(){
    // let newRefresh = debounce(this.$refs.scroll.refresh,500)//防抖监听
    // this.itemImgListener = ()=>{
    //   newRefresh()
    // }
    // this.$bus.$on('itemImgLoad',this.itemImgListener)

    //mixin 混入
  },
  destroyed(){
    this.$bus.$off(this.itemImgListener)
  },
  updated(){//有数据更新，就会执行，能够确保有值
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position){
      //1.获取y值
      const positionY = -position.y
      //2.positionY 与主题中的值进行对比
      let length = this.themeTopYs.length
      for(let i = 0; i < length; i++ ){
        if(this.currentIndex !== i && (i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])||(i ===length-1 && positionY >= this.themeTopYs[i])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      //混入 mixin 回到顶部图标是否显示
      // 判断 BackTop 是否显示
      this.isShow = (-position.y) > 1000;
    },
    addToCart(){
      //1.获取商品信息，添加到购物车中即可
      const product = {}
      product.image = this.topImgs[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      this.$store.dispatch('addCart',product).then(res =>{//添加购物车成功
        this.$toast.show(res,1000)
      })
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
  bottom:58px;
}
.detail-nav{
  position:relative;
  background-color: #fff;
  z-index: 10;
}
</style>