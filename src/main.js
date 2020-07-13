import Vue from 'vue';
import App from './App.vue';
import router from './router';
require('./assets/css/app.css');
import { store } from './store/store'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
