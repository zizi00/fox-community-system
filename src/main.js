import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.css'
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
