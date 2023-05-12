import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import PageNotFoundView from '../views/PageNotFoundView.vue'
import TableView from '../views/TableView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/analytics/health-checks",
      name: "Table",
      component: TableView,
    },
    {
      path: "/home",
      name: "Home",
      component: HomeView,
    },

    {
      path: "/:pathMatch(.*)*",
      name: "PageNotFound",
      component: PageNotFoundView,
    },
  ],
})

export default router
