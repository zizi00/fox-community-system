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
    redirect: '/home',
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
        import ( /* webpackChunkName: "pages" */ '@/views/pages/identify/identifygirl'),
      },
      { path: '/identifyboy', name: 'identifyboy',
        meta: { title: '男认证中心' },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/identify/identifyboy'),
      },
      { path: '/usersgirl', name: 'usersgirl',
        meta: { title: '女用户管理' },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/users/usersgirl'),
      },
      { path: '/usersboy', name: 'usersboy',
        meta: { title: '男用户管理' },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/users/usersboy'),
      },
      { path: '/invitecode', name: 'invitecode',
        meta: { title: '邀请码管理' },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/invitecode/invitecode'),
      },
      { path: '/complaint', name: 'complaint',
        meta: { title: '举报管理' },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/complaint/complaint'),
      },
      { path: '/cashout', name: 'cashout',
        meta: { title: '用户提现' },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/cashout/cashout'),
      },
      { path: '/capitalflow', name: 'capitalflow',
        meta: { title: '资金流水' },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/datacollect/capitalflow'),
      },
      { path: '/recharger', name: 'recharger',
        meta: { title: '充值记录' },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/datacollect/recharger'),
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
