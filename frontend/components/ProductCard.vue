<template>
  <v-card>
    <v-img
      height="250"
      :src="getStrapiMedia(product.image.formats.small.url)"
    ></v-img>

    <v-card-title>{{ product.name }}</v-card-title>

    <v-card-text>
      <div class="text-subtitle-1">{{ product.price }} €</div>

      <v-btn
        :to="{
          name: 'categories-slug',
          params: { slug: product.category.slug },
        }"
        class="my-4"
        color="accent"
        small
        rounded
        >{{ product.category.name }}</v-btn
      >

      <div>
        {{ product.description }}
      </div>
    </v-card-text>

    <v-card-actions class="d-flex justify-space-between">
      <v-btn
        :to="{ name: 'products-slug', params: { slug: product.slug } }"
        color="deep-purple lighten-2"
        text
      >
        See More
      </v-btn>
      <v-btn color="primary" @click.prevent="addToCart(product)">
        <v-icon>mdi-cart-plus</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getStrapiMedia } from '../utils/medias'
export default {
  props: {
    product: { type: Object, require: true, default: null },
  },
  computed: {},
  methods: {
    getStrapiMedia,
    addToCart(product) {
      this.$store.commit('cart/add', { product, amount: 1 })
    },
  },
}
</script>

<style></style>
