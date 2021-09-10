<template>
  <v-sheet min-height="70vh" rounded="lg" class="pa-3">
    <h1>Dashboard</h1>
    <p>Hello {{ loggedInUser.username }}</p>

    <div>
      <h2>Orders</h2>
      <div v-for="order in orders" :key="order.id">
        {{ order.total }}
      </div>
    </div>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  async asyncData({ $axios }) {
    const orders = await $axios.$get('orders')
    console.log(orders)
    return { orders }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
}
</script>

<style></style>
