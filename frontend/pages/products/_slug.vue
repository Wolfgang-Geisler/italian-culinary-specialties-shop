<template>
  <v-sheet min-height="70vh" rounded="lg" class="pa-3">
    <v-container>
      <v-row>
        <v-col
          xs="12"
          sm="12"
          md="6"
          class="d-flex align-content-space-between flex-wrap"
        >
          <div>
            <h1 class="mb-4">{{ product.name }}</h1>

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
            <div class="text-subtitle-1">{{ product.price }} €</div>
            <p>{{ product.description }}</p>
          </div>

          <v-container fluid class="pa-0 d-flex justify-space-between">
            <v-text-field
              v-model="amount"
              type="number"
              min="1"
              class="shrink"
              append-outer-icon="mdi-plus"
              prepend-icon="mdi-minus"
              @click:append-outer="increment"
              @click:prepend="decrement"
              >Amount</v-text-field
            >
            <v-btn color="primary" @click.prevent="addToCart">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </v-container>
        </v-col>
        <v-col xs="12" sm="12" md="6">
          <v-img
            :aspect-ratio="3 / 4"
            :src="getStrapiMedia(product.image.formats.small.url)"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { getStrapiMedia } from '../../utils/medias'
export default {
  async asyncData({ $axios, params }) {
    const slug = params.slug
    const products = await $axios.$get(`/products?slug=${slug}`)
    const product = products[0]
    return { product }
  },
  data() {
    return {
      amount: 1,
    }
  },
  methods: {
    getStrapiMedia,
    increment() {
      this.amount++
    },
    decrement() {
      if (this.amount > 1) {
        this.amount--
      }
    },
    addToCart() {
      if (this.amount < 1) {
        this.amount = 1
        return
      }
      this.$store.commit('cart/add', {
        product: this.product,
        amount: this.amount,
      })
      this.amount = 1
    },
  },
}
</script>

<style></style>
