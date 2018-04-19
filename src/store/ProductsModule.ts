import {getProducts, Product} from '@/api/shop';
import { RootState } from '@/store';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';

export interface ProductsState {
    all: Product[];
}

const initialState: ProductsState = {
    all: [],
};

const builder = getStoreBuilder<RootState>().module('products', initialState);

const allProductsGetter = builder.read(function allProducts(state: ProductsState) { return state.all; });

function setProducts(state: ProductsState, newProducts: Product[]) {
    state.all = newProducts;
}

function decrementProductInventory(state: ProductsState, product: Product) {
    const foundProduct = state.all.find(p => p.id === product.id);
    foundProduct!.inventory--;
}

async function getAllProducts(context: BareActionContext<ProductsState, RootState>) {
    const shopProducts = await getProducts();
    products.setProducts(shopProducts);
}

export const products = {
    get allProducts() { return allProductsGetter(); },

    setProducts: builder.commit(setProducts),
    decrementProductInventory: builder.commit(decrementProductInventory),

    getAllProducts: builder.dispatch(getAllProducts),
};
