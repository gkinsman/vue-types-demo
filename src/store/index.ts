import Vue from 'vue';
import Vuex from 'vuex';
import { getStoreBuilder } from 'vuex-typex';
import { CartState } from './CartModule';
import './CartModule';
import { ProductsState } from './ProductsModule';
import './ProductsModule';

Vue.use(Vuex);

export interface RootState {
    cart: CartState;
    products: ProductsState;
}

const store = getStoreBuilder<RootState>().vuexStore();
export default store;
