import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Index from "../views/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: '/index',
  },
  {
    path: "/login",
    name: "Login",
    meta: { title: '登录' },
          component: () =>
          import ( /* webpackChunkName: "login" */ '@/views/Login/login'),
  },
  { path: '/index',
     name: 'index',
    //  redirect: '/home',
     component: Index,
     children:[
      { path: '/home', name: 'home',
        meta: { title: '首页' },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/Home'),
      },
      { path: '/identifygirl', name: 'identifygirl',
        meta: { title: '女认证中心' },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/identifygirl'),
      },
      { path: '/identifyboy', name: 'identifyboy',
        meta: { title: '男认证中心' },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/identifyboy'),
      },
     ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
