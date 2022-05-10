import Vue from 'vue'
import Router from 'vue-router'

//路由懒加载的方式导入组件
const Home = () => import("../views/home/Home")
const Category = () => import("../views/category/Category")
const Shop = () => import("../views/shop/Shop")
const Profile = () => import("../views/profile/Profile")
Vue.use(Router)

//映射关系
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component: Home
  },
  {
    path:'/category',
    component: Category
  },
  {
    path:'/shop',
    component:Shop
  },
  {
    path: '/profile',
    component: Profile
  }
]
const router = new Router({
  routes: routes,
  mode: 'history'
})
export default  router
