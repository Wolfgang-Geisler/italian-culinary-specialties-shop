<template>
  <v-app>
    <Navigation />
    <v-main class="grey lighten-4">
      <v-container>
        <v-row>
          <v-col>
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from '../components/Navigation.vue'
export default {
  components: { Navigation },
}
</script>
