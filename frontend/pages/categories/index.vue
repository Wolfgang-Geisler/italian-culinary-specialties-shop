<template>
  <v-sheet min-height="70vh" rounded="lg" class="pa-3">
    <v-container>
      <v-row>
        <v-col
          v-for="category in categories"
          :key="category.id"
          cols="12"
          sm="4"
        >
          <CategoryCard :category="category" />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
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
