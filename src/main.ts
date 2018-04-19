import Vue from 'vue';
import store from '@/store';
import { currency } from '@/filters/currency';
import App from "./App.vue"

Vue.config.productionTip = false;

Vue.filter("currency", currency)

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
