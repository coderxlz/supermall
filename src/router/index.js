import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/Home');
const Category = () => import('../views/Category');
const Shop = ()=> import('../views/Shop');
const Profile = ()=> import('../views/Profile');

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
