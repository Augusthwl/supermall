import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'


import toast from './components/common/toast'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

//安装 toast 插件，执行导入文件中的 install 函数
Vue.use(toast)

//解决移动端 300ms 延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad, {
  loading:require('@/assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
