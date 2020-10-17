import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/Home');
const Category = () => import('../views/category/Category');
const Shop = ()=> import('../views/shop/Shop');
const Profile = ()=> import('../views/profile/Profile');
const Detail = () => import('../views/detail/Detail')
Vue.use(Router)

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component: Category

  },
  {
    path:'/shop',
    component: Shop
  },
  {
    path:'/profile',
    component: Profile
  },
  //使用动态路由，动态传入商品id
  {
    path:'/detail/:iid',
    component:Detail
  }
]

export default new Router({
  routes,
  mode:'history'
})
