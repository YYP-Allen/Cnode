import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article'
import postList from '../components/postList'
import userInfo from '../components/userInfo'
import slideBar from '../components/slideBar'
import login from '../components/login'
import register from '../components/register'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'root',
    path: '/',
    components: {
      main: postList
    }
  },
    {
      name: 'post_content',
      // 传递两个参数， id 与 name,在postList对应的组件中 router-link定义
      path: '/topic:id&author=:name',
      components: {
        main: Article,
        slidebar: slideBar
      }
    },
    {
      name: 'user_info',
      path: '/userinfo/:name',
      components: {
        main: userInfo
      }
    },
    {
      name: 'loginWindow',
      path: '/login',
      components: {
        main: login
      }
    },
    {
      name: 'registerWindow',
      path: '/register',
      components: {
        main: register
      }
    }
  ]
})
