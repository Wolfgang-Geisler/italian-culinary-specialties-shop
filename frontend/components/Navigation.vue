<template>
  <v-app-bar app color="grey" flat>
    <v-container class="py-0 fill-height">
      <nuxt-link to="/">
        <v-img
          max-height="80"
          max-width="110"
          contain
          src="/logo.png"
          alt=""
        >
        </v-img>
      </nuxt-link>
      <v-spacer></v-spacer>

      <v-btn
        v-for="link in links"
        :key="link.name"
        text
        :to="link.to"
        :color="link.color"
      >
        {{ link.name }}
      </v-btn>

      <v-btn v-if="!isAuthenticated" to="/register" color="primary" text
        >Register</v-btn
      >
      <v-btn v-if="!isAuthenticated" text to="/login">Login</v-btn>

      <v-btn v-if="isAuthenticated" text @click.prevent="logout">Logout</v-btn>
      <v-btn v-if="isAuthenticated" text to="/account">{{
        loggedInUser.username
      }}</v-btn>
      <v-btn text to="/cart"
        ><v-icon>mdi-cart</v-icon> ({{ cartAmount }})</v-btn
      >
    </v-container>
  </v-app-bar>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    links: [
      { name: 'Products', to: '/products' },
      { name: 'Categories', to: '/categories' },
    ],
  }),
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'cartAmount']),
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
