import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: { name: 'PostList' }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login.vue')
    },
    {
      path: '/posts',
      name: 'Posts',
      component: () => import('@/components/Posts.vue'),
      children: [
        {
          path: '',
          name: 'PostList',
          component: () => import('@/components/PostList.vue')
        },
        {
          path: 'create-post',
          name: 'CreatePost',
          component: () => import('@/components/CreatePost.vue')
        },
        {
          path: ':id',
          name: 'PostDetails',
          component: () => import('@/components/PostDetails.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/components/NotFound.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (
    to.name === 'Login' &&
    localStorage.getItem('authToken') &&
    localStorage.getItem('authUserInfo')
  ) {
    next({ name: 'PostList' })
  } else if (
    to.name !== 'Login' &&
    (!localStorage.getItem('authToken') || !localStorage.getItem('authUserInfo'))
  ) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
