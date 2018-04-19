<template>
    <div id="app">
        <h1>Shopping Cart Example</h1>
        <hr>
        <h2>Products</h2>
        <ProductList/>
        <hr>
        <ShoppingCart/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ProductList from './components/ProductList.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import { Component } from 'av-ts';

@Component({
  components: {
    ProductList,
    ShoppingCart,
  },
})
export default class App extends Vue {}
</script>
