import {currency} from '@/filters/currency';
import store from '@/store';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.filter('currency', currency);

new Vue({
    store,
    render: (h) => h(App),
}).$mount('#app');
