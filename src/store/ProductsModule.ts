import { Product, Shop } from '@/api/shop'
import { getStoreBuilder, BareActionContext } from 'vuex-typex';
import { RootState } from '@/store';
import { ActionContext } from 'vuex';

export interface ProductsState {
    all: Product[]
}

const initialState: ProductsState = {
    all: []
}

const builder = getStoreBuilder<RootState>().module("products", initialState)

const allProductsGetter = builder.read(function allProducts(state: ProductsState) { return state.all })


function setProducts(state: ProductsState, products: Product[]) {
    state.all = products
}

function decrementProductInventory(state: ProductsState, id: number) {
    const product = state.all.find(p => p.id === id)
    product!.inventory--
}

async function getAllProducts(context: BareActionContext<ProductsState, RootState>) {
    const shopProducts = await Shop.getProducts()
    products.setProducts(shopProducts)
}

export const products = {
    get allProducts() { return allProductsGetter() },

    setProducts: builder.commit(setProducts),
    decrementProductInventory: builder.commit(decrementProductInventory),

    getAllProducts: builder.dispatch(getAllProducts),
}