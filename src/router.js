import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

// Remisiones
import Remisiones from './views/Remisiones'

// Notificaciones
import Notificaciones from './views/Notificaciones'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Remisiones
    },
    {
      path: '/notificaciones',
      name: 'notificaciones',
      component: Notificaciones
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
