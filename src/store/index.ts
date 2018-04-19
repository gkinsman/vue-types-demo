import Vue from 'vue';
import Vuex from 'vuex';
import { getStoreBuilder } from 'vuex-typex';

// Each module must be explicitly imported here
// so that they are built before the store is built.
import './CartModule';
import './ProductsModule';
import { ProductsState } from './ProductsModule';
import { CartState } from './CartModule';

Vue.use(Vuex);

export interface RootState {
    cart: CartState;
    products: ProductsState;
}

const store = getStoreBuilder<RootState>().vuexStore();
export default store;
