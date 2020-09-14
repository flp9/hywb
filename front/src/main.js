import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/index.scss' // 全局的css
import router from "./router";
import store from "./store";
// import './routerControl'
import App from "./App.vue";
import '../static/js/jquery.mousewheel.min.js'

Vue.use(ElementUI)
Vue.config.productionTip = false;
import BaiduMap from 'vue-baidu-map';
Vue.use(BaiduMap, {
  ak: 'HacdQIApCMjv5jNk6MtGEMQoO7sYKAs6'
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
