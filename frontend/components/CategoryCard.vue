<template>
      <v-card>
        <v-img
          :aspect-ratio="3 / 4"
          :src="getStrapiMedia(category.image.formats.small.url)"
        >
              <v-btn
                :to="{
                  name: 'categories-slug',
                  params: { slug: category.slug },
                }"
                rounded
              >
                {{ category.name }}
              </v-btn>
        </v-img>
      </v-card>
</template>

<script>
import { getStrapiMedia } from '../utils/medias'
export default {
  props: {
    category: { type: Object, require: true, default: null },
  },
  methods: {
    getStrapiMedia,
  },
}
</script>

<style></style>
