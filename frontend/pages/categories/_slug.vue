<template>
  <v-container>
    <h1 class="mb-4">{{ products[0].category.name }}</h1>
    <v-row>
      <v-col v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductCard from '../../components/ProductCard.vue'

export default {
  components: {
    ProductCard,
  },

  async asyncData({ $axios, params }) {
    const slug = params.slug
    const products = await $axios.$get('/products?category.slug=' + slug)
    return { products }
  },
}
</script>

<style></style>
