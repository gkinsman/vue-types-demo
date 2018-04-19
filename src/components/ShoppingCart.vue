<template>
    <div class="cart">
        <h2>Your Cart</h2>
        <p v-show="!cartProducts.length">
            <i>Please add some products to cart.</i>
        </p>
        <ul>
            <li v-for="cartItem in cartProducts" :key="cartItem.product.id">
                {{ cartItem.product.title }} - {{ cartItem.product.price | currency }} x {{ cartItem.quantity }}
            </li>
        </ul>
        <p>Total: {{ total | currency }}</p>
        <p>
            <button :disabled="!cartProducts.length" @click="checkout(cartProducts)">Checkout</button>
        </p>
        <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
    </div>
</template>

<script lang="ts">
    import {cart} from "@/store/CartModule";
    import Vue from "vue";
    import {Component} from "av-ts";

    @Component
    export default class ShoppingCart extends Vue {

        get cartProducts() {
            return cart.cartProducts;
        }

        get checkoutStatus() {
            return cart.checkoutStatus;
        }

        get total() {
            return cart.cartTotalPrice;
        }

        async checkout() {
            await cart.checkout();
        }
    }
</script>