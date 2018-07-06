import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect']// no redirect whitelist
// const hasGetRoleList = ['admin','seller']
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  
  if (getToken()) {
    if (store.getters.hasGetRole) {
      // if (hasGetRoleList.indexOf(store.getters.hasGetRole)!==-1) { 
      // determine if there has token 
      /* has token*/
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
      } else {
        /*if (hasGetRoleList.indexOf(store.getters.hasGetRole)===-1) { // 判断当前用户是否已拉取完user_info信息
          store.dispatch('GetUserInfo').then(res => { // 拉取user_info
            const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
            store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          }).catch((err) => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({ path: '/' })
            })
          })
        }*/ 
        // console.log('permission.js:',store.getters.hasGetRole)
        if(!store.getters.hasAddRoute){
          //登录之后生成动态路由
          const roles = store.getters.roles
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表

            
            store.state.user.hasAddRoute = true
            store.dispatch('addRoute').then(()=>{
              next({ ...to, replace: true })
            }).catch((err)=>{
              store.dispatch('FedLogOut').then(() => {
                Message.error('你没有获得任何身份 .')
                next({ path: '/' })
              })
            })
            // next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }
        // if(hasGetRoleList.indexOf(store.getters.hasGetRole)===-1){
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error('你没有获得任何身份')
        //     next({ path: '/' })
        //   })
        // }
        else {
          // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
          if (hasPermission(store.getters.roles, to.meta.roles)) {
            next()//
          } else {
            next({ path: '/401', replace: true, query: { noGoBack: true }})
          }
          // 可删 ↑
        }
      }
    } else {
      store.dispatch('FedLogOut').then(()=>{
        next('/login')
      })
      /* has no token*/
      // if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      //   next()
      // } else {
      //   next('/login') // 否则全部重定向到登录页
      //   NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      // }
    }
  }else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
