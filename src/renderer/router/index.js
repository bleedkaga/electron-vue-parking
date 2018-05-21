import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
      children: [
        {
          path: '',
          meta: {
            name: 'abnormal'
          },
          component: require('@/components/abnormal/index').default,
        },
        {
          path: 'query',
          meta: {
            name: 'query'
          },
          component: require('@/components/info-query/entry').default
        },
        {
          path: 'query-result',
          meta: {
            name: 'query'
          },
          component: require('@/components/info-query/detail').default
        },
        {
          path: 'statistics',
          meta: {
            name: 'statistics'
          },
          component: require('@/components/statistics/index').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/components/login/index').default
    }
  ]
})

router.beforeEach((to, from, next) => {
  let tokenName = JSON.parse(sessionStorage.getItem('user'));
  if(!tokenName && to.name !== 'login'){
    next('/login')  
  } else {
    next()
  }
  
})

export default router
