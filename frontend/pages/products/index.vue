<template>
  <div class="container">
    <div class="row">
      <div
        v-for="product in products"
        :key="product.id"
        class="mb-4 col-xs-12 col-sm-6 col-md-4 col-lg-3"
      >
        <div id="card">
          <v-card class="mx-auto" max-width="400">
            <v-img
              v-if="product.image"
              :src="getStrapiMedia(product.image.formats.small.url)"
              alt=""
              class="white--text align-end"
              height="200px"
            >
              <v-card-title>{{ product.name }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">
              {{ product.price + ' €'}}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>
                {{ product.description }}
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text :to="`products/${product.slug}`"> See more </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStrapiMedia } from '../../utils/medias'
export default {
  async asyncData({ $axios }) {
    const products = await $axios.$get('/products')
    return { products }
  },
  methods: {
    getStrapiMedia,
  }
}
</script>

<style></style>