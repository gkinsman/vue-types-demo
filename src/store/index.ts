import { getStoreBuilder } from 'vuex-typex';
import { CartState } from './CartModule';
import { ProductsState } from './ProductsModule';
import Vuex from 'vuex';
import Vue from 'vue';
import './CartModule'
import './ProductsModule'

Vue.use(Vuex)

export interface RootState {
    cart: CartState,
    products: ProductsState
}

const store = getStoreBuilder<RootState>().vuexStore();
export default store;