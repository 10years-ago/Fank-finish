import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//解决重复点击报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('views/Home/Home.vue'),
    redirect:'/HomePage',
    children:[
      {
        path:"HomePage",
        name:"HomePage",
        component: () => import('views/HomePage/HomePage.vue')
      },
      {
        path:"Franchisee",
        name:"Franchisee",
        component: () => import('views/Franchisee/Franchisee.vue')
      },
      {
        path:"SelectTest",
        name:"SelectTest",
        component: () => import('views/SelectTest/SelectTest.vue')
      },
      {
        path:"StuAdd",
        name:"StuAdd",
        component: () => import('views/StuAdd/StuAdd.vue')
      },
      {
        path:"Finance",
        name:"Finance",
        component: () => import('views/Finance/Finance.vue')
      },
      {
        path:"Car",
        name:"Car",
        component: () => import('views/Car/Car.vue')
      },
      {
        path:"NewStu",
        name:"NewStu",
        component: () => import('views/NewStu/NewStu.vue')
      },
      {
        path:"Pic",
        name:"Pic",
        component: () => import('views/Pic/pic.vue')
      },
    ]
  },
  {
    path:"/Login",
    name:'Login',
    component: () => import('views/Login/Login.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(localStorage.school == undefined);
  if(to.name !== 'Login' && (localStorage.school == undefined || localStorage.school == '')){
    next('/Login')
  }
  else{
    next()
  }
})

export default router
