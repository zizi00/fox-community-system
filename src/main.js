import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.css'
import * as filters from './filters' // 全局filter
Vue.config.productionTip = false;
// 加载过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
