import { getStoreBuilder, BareActionContext } from 'vuex-typex'
import { RootState } from './index'
import { Product, Shop } from '@/api/shop'

export interface CartItem {
    product: Product
    quantity: number
}

export interface CartState {
    added: CartItem[]
    checkoutStatus: string | null
}

const initialState: CartState = {
    added: [],
    checkoutStatus: null
}

const builder = getStoreBuilder<RootState>().module("cart", initialState)

const checkoutStatusGetter = builder.read(function checkoutStatus(state: CartState) { return state.checkoutStatus })
const cartProductsGetter = builder.read(function cartProducts(state: CartState) { return state.added })
const cartTotalPriceGetter = builder.read(function cartTotalPrice(state: CartState) {
    return cart.cartProducts.reduce((total, cartItem) => {
        return total + cartItem.product.price * cartItem.quantity
    }, 0)
})

function addProductToCart(state: CartState, product: Product) {
    const existingItem = state.added.find(p => p.product.id === product.id)
    if (existingItem) existingItem.quantity++
    else state.added.push({ product: product, quantity: 1 })
}
function incrementItemQuantity(state: CartState, id: number) {
    const item = state.added.find(p => p.product.id === id)
    item!.quantity++
}
function setCartItems(state: CartState, items: CartItem[]) {
    state.added = items
}
function setCheckoutStatus(state: CartState, status: string | null) {
    state.checkoutStatus = status
}

async function checkout(context: BareActionContext<CartState, RootState>) {
    const savedCartItems = [...context.state.added]
    cart.setCheckoutStatus(null)
    cart.setCartItems([])
    try {
        await Shop.buyProducts(context.state.added)
        cart.setCheckoutStatus("successful")
    } catch {
        cart.setCheckoutStatus("failed")
        cart.setCartItems(savedCartItems)
    }
}

export const cart = {
    get checkoutStatus() { return checkoutStatusGetter() },
    get cartProducts() { return cartProductsGetter() },
    get cartTotalPrice() { return cartTotalPriceGetter() },

    addProductToCart: builder.commit(addProductToCart),
    incrementItemQuanitity: builder.commit(incrementItemQuantity),
    setCartItems: builder.commit(setCartItems),
    setCheckoutStatus: builder.commit(setCheckoutStatus),

    checkout: builder.dispatch(checkout),
}