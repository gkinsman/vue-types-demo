import {buyProducts, Product} from '@/api/shop';
import {BareActionContext, getStoreBuilder} from 'vuex-typex';
import {RootState} from './index';
import {products} from '@/store/ProductsModule';

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartState {
    added: CartItem[];
    checkoutStatus: string | null;
}

const initialState: CartState = {
    added: [],
    checkoutStatus: null,
};

const builder = getStoreBuilder<RootState>().module('cart', initialState);

const checkoutStatusGetter = builder.read(function checkoutStatus(state: CartState) {
    return state.checkoutStatus;
});
const cartProductsGetter = builder.read(function cartProducts(state: CartState) {
    return state.added;
});
const cartTotalPriceGetter = builder.read(function cartTotalPrice(state: CartState) {
    return cart.cartProducts.reduce((total, cartItem) => {
        return total + cartItem.product.price * cartItem.quantity;
    }, 0);
});

function pushProductToCart(state: CartState, product: Product) {
    state.added.push({product, quantity: 1});
}

function incrementItemQuantity(state: CartState, product: Product) {
    const item = state.added.find(p => p.product.id === product.id);
    item!.quantity++;
}

function setCartItems(state: CartState, items: CartItem[]) {
    state.added = items;
}

function setCheckoutStatus(state: CartState, status: string | null) {
    state.checkoutStatus = status;
}

async function checkout(context: BareActionContext<CartState, RootState>) {
    const savedCartItems = [...context.state.added];
    cart.setCheckoutStatus(null);
    cart.setCartItems([]);
    try {
        await buyProducts(context.state.added);
        cart.setCheckoutStatus('successful');
    } catch {
        cart.setCheckoutStatus('failed');
        cart.setCartItems(savedCartItems);
    }
}

async function addProductToCart(context: BareActionContext<CartState, RootState>, product: Product) {
    cart.setCheckoutStatus(null);
    if (product.inventory > 0) {
        const cartItem = cart.state.added.find(item => item.product.id === product.id);
        if (!cartItem) {
            cart.pushProductToCart(product);
        } else {
            cart.incrementItemQuantity(product);
        }

        products.decrementProductInventory(product);
    }
}

const stateGetter = builder.state();

export const cart = {
    get state() {
        return stateGetter();
    },

    get checkoutStatus() {
        return checkoutStatusGetter();
    },
    get cartProducts() {
        return cartProductsGetter();
    },
    get cartTotalPrice() {
        return cartTotalPriceGetter();
    },

    pushProductToCart: builder.commit(pushProductToCart),
    incrementItemQuantity: builder.commit(incrementItemQuantity),
    setCartItems: builder.commit(setCartItems),
    setCheckoutStatus: builder.commit(setCheckoutStatus),

    checkout: builder.dispatch(checkout),
    addProductToCart: builder.dispatch(addProductToCart),
};
