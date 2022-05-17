// vue 中的混入
import { debounce } from "./utils"
export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null
    }
  },
  mounted(){
      // 1、图片加载完成时间的监听
      let newRefresh = debounce(this.$refs.scroll.refresh,500)//防抖监听
      this.itemImgListener = ()=>{//监听事件总线
        newRefresh()
      }
      this.$bus.$on('itemImgLoad',this.itemImgListener)
      // console.log('来自混入中的 mounted()');
  }
}

import BackTop from '../components/content/backTop/BackTop'
export const backTopMixin = {
  data(){
    return {
      isShow:false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,300)
    }
  }
}