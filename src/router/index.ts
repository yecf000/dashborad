import { createRouter, createWebHistory } from "vue-router";
const whiteList = ["/", "/home", "/login", "/register", "/forget"];

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/market/index.vue"),
    },
  ],
});
//Route Navigation Guard····················
router.beforeEach((to, from, next) => {
  if (from.path == "/home" || from.path == "/info" || from.path == "/assets") {
    localStorage.setItem("lastindexpage", from.path);
  }
  localStorage.setItem("lastpage", from.path);
  if (whiteList.includes(to.path) !== -1) {
    next();
  } else {
    if (localStorage.getItem("Token")) {
      next();
    } else {
      window.location.href = "/login";
    }
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   return "/login";
    // }
  }
});

export default router;
