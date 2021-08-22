<template>
  <div>
    <h1>Slug</h1>
    <p>gutes Essen</p>
    <div>
      {{ category }}
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const slug = params.slug;
    const categories = await $axios.$get('/categories?slug='+slug)
    const category = categories[0];
    return { category }
  },
}
</script>

<style></style>
