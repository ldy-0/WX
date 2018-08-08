import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index'
import home from '@/pages/index/home'
// const example  = () => import('@/pages/index/example')
// const business  = () => import('@/pages/index/business')
// const aboutus  = () => import('@/pages/index/aboutus')
// const recruit  = () => import('@/pages/index/recruit')
import example from '@/pages/index/example'
// import business from '@/pages/index/business'
import aboutus from '@/pages/index/aboutus'
import recruit from '@/pages/index/recruit'
import introduction from '@/pages/index/introduction'
// const news  = () => import('@/pages/index/news')
// import example from '@/pages/index/example'
// import business from '@/pages/index/business'
// import aboutus from '@/pages/index/aboutus'
// import recruit from '@/pages/index/recruit'
import news from '@/pages/index/news'
import newsDetail from '@/pages/index/newsDetail'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      component: index,
      children:[
        {
          path:"",
          component:home
        },{
          path:"/example",
          component:example
        },
        {
          path:"/introduction",
          component:introduction
        },
        {
          path:"/news",
          component:news
        },
        {
          path:"/newsDetail",
          component:newsDetail
        },
        // {
        //   path:"/business",
        //   component:business
        // },
        {
          path:"/aboutus",
          component:aboutus
        },{
          path:"/recruit",
          component:recruit
        }
      ]
    }
  ]
})
