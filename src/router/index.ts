import { createRouter, createWebHistory } from 'vue-router';
import BookList from '@/views/books/BookList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { path: '/book' },
      meta: {
        title: '',
      },
      children: [
        {
          path: 'book',
          component: BookList,
          meta: {
            title: 'Book',
          },
          children: [],
        },
        {
          path: 'book/create',
          name: 'create',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/books/BookAdd.vue'),
        },
        {
          path: 'book/:id',
          name: 'view',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/books/BookView.vue'),
        },
      ],
    },
  ],
});

export default router;
