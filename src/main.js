import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './pages/Home'
import Editor from './pages/Editor'
import MyProjects from './pages/MyProjects'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: 'codezing',
    },
  },
  {
    path: '/editor/:title?',
    component: Editor,
    meta: {
      title: 'codezing-editor',
    },
  },
  {
    path: '/my-projects',
    component: MyProjects,
    meta: {
      title: 'codezing-MyProjects',
    },
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
