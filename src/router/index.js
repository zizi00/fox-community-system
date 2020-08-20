import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index.vue";
import Nofind from "../views/errorPage/404.vue";
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
  { path: '*',
     name: '/404',
     component: Nofind,
     meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
      }
  },
  { path: '/index',
    name: 'index',
    redirect: '/home',
    component: Index,
    children:[
      { path: '/home', name: 'home',
        meta: { 
          title: '首页',
          requireAuth: true
      },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/Home'),
      },
      { path: '/identifygirl', name: 'identifygirl',
        meta: {
          title: '女认证中心',
          requireAuth: true
        },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/identify/identifygirl'),
      },
      { path: '/usersgirl', name: 'usersgirl',
        meta: {
          title: '女用户管理',
          requireAuth: true
        },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/users/usersgirl'),
      },
      { path: '/usersboy', name: 'usersboy',
        meta: {
          title: '男用户管理',
          requireAuth: true
        },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/users/usersboy'),
      },
      { path: '/usersupdate', name: 'usersupdate',
        meta: {
          title: '女用户同步',
          requireAuth: true
        },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/users/usersupdate'),
      },
      { path: '/invitecode', name: 'invitecode',
        meta: {
          title: '邀请码管理',
          requireAuth: true
        },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/invitecode/invitecode'),
      },
      { path: '/complaint', name: 'complaint',
        meta: {
          title: '举报管理',
          requireAuth: true
        },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/complaint/complaint'),
      },
      { path: '/cashout', name: 'cashout',
        meta: {
          title: '用户提现',
          requireAuth: true
        },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/cashout/cashout'),
      },
      { path: '/capitalflow', name: 'capitalflow',
        meta: {
          title: '资金流水',
          requireAuth: true
        },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/datacollect/capitalflow'),
      },
      { path: '/recharger', name: 'recharger',
        meta: {
          title: '充值记录',
          requireAuth: true
        },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/datacollect/recharger'),
      },
      { path: '/article', name: 'article',
        meta: {
          title: '内容列表',
          requireAuth: true
        },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/article/article'),
      },
      { path: '/addArticle', name: 'addArticle',
        meta: {
          title: '添加内容',
          requireAuth: true
        },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/article/addArticle'),
      },
      { path: '/profitSet', name: 'profitSet',
        meta: {
          title: '基础设置',
          requireAuth: true
        },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/profit/profitSet'),
      },
      { path: '/profitRecord', name: 'profitRecord',
        meta: {
          title: '分销记录',
          requireAuth: true
        },
        component: () =>
        import ( /* webpackChunkName: "pages" */ '@/views/pages/profit/profitRecord'),
      }
     ]
  }
];

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  // base: '/fox/',
  routes
  
});
router.beforeEach(async(to, from, next) =>{
  // 验证并保存token
  let token = localStorage.getItem("token")
  if (to.meta.requireAuth) {
    if (!token) {
      router.push({ name: 'Login' })
    }
  }
  next()
});

export default router;
