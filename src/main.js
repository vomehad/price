import Vue from 'vue';
import App from './App.vue';
import router from './router';
require('./assets/css/app.css');

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
