<template>
<div v-if="categories">
    <v-card v-for="category in categories" :key='category.id'
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{category.name}}
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      >
      <img :src="'http://localhost:1337'+category.image.formats.thumbnail.url" alt="">
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        :to="{ name: 'categories-slug', params: { slug: category.slug } }"
      >
        Button
      </v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const categories = await $axios.$get('/categories')
    return { categories }
  },
}
</script>

<style></style>
