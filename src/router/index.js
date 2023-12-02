import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@views/Home";

const routes = [
  {
    path: "/",
    name: "Cards",
    component: Home,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
