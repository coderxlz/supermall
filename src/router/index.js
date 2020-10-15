import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/Home');
const Category = () => import('../views/category/Category');
const Shop = ()=> import('../views/shop/Shop');
const Profile = ()=> import('../views/profile/Profile');

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
  }
]

export default new Router({
  routes,
  mode:'history'
})
