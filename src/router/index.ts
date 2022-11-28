import { createRouter, createWebHistory } from 'vue-router';
import BookList from '@/views/books/BookList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BookList,
      meta: {
        title: '',
      },
    },
    {
      path: '/create',
      name: 'create',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/books/BookAdd.vue'),
    },
  ],
});

export default router;
