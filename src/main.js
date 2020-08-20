import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import ElementUI from 'element-ui';
import router from './router'
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios'
import debounce from './assets/js/utils'

Vue.config.devtools = true

Vue.use(VueAxios, axios)

Vue.prototype.$debounce = debounce

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')