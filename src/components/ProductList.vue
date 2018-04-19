<template>
    <ul>
        <li v-for="product in products" :key="product.id">
            {{ product.title }} - {{ product.price | currency }}
            <br>
            <button :disabled="!product.inventory" @click="addProductToCart(product)">
                Add to cart
            </button>
        </li>
    </ul>
</template>

<script lang="ts">
import { products } from '@/store/ProductsModule';
import { cart } from '@/store/CartModule';
import { Product } from '@/api/shop';
import Vue from 'vue';
import { Component, Lifecycle } from 'av-ts';

@Component
export default class ProductList extends Vue {
  get products() {
    return products.allProducts;
  }

  addProductToCart(product: Product) {
    cart.addProductToCart(product);
  }

  @Lifecycle
  async created() {
    await products.getAllProducts();
  }
}
</script>
