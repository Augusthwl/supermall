<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick" 
                 ref="tabControl1"
                 class="tabControl" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingup="loadMore">
      <home-swiper :cbanners="banners" @swiperImgLoad="swiperImgLoad"/>
      <home-recommend :recommends="recommends"/>
      <home-feature/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
import HomeSwiper from './childrenComps/HomeSwiper'
import HomeRecommend from './childrenComps/HomeRecommend'
import HomeFeature from './childrenComps/HomeFeature'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import { debounce } from 'common/utils'

export default {
  name:"Home",
  components:{
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
},
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShow:false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY:0,
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  destory(){
    console.log('destroy');
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()
  },
  created(){
    //1.请求多个数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted(){
    // 1、图片加载完成时间的监听
    const refresh = debounce(this.$refs.scroll.refresh,500)//防抖监听
    this.$bus.$on('itemImgLoad',()=>{//监听事件总线
      refresh()
    })
    

  },
  methods:{
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      let page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res =>{
        this.goods[type].list.push(...res.data.list)//把一个数组内的所有元素push到数组中
        this.goods[type].page += 1
      })
    },
    /**
     * 事件监听相关的方法
     */
    tabClick(index){
      switch(index){
        case 0:
          this.currentType ='pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      // 1.判断 BackTop 是否显示
      this.isShow = (-position.y) > 1000;
      // 2.TabControl 是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    // 加载更多
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
    },
    swiperImgLoad(){
      // 2、获取 tabControl 的 offsetTop 组件没有该属性，元素才有
      // 所有组件都有一个属性 $el:用于获取组件元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  }
}
</script>

<style scoped>
#home{
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;

}
.tab-control{
  /*position: sticky;*/
  position:relative;
  background-color: #fff;
  z-index: 9;
}
.content{
  overflow: hidden;
  position:absolute;
  top: 44px;
  bottom:49px;
  left:0;
  right:0;
}
</style>