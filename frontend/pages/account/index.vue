<template>
  <v-sheet min-height="70vh" rounded="lg" class="pa-3">
    <h1>Dashboard</h1>
    <p>Welcome {{ loggedInUser.username }}</p>
    <div>
      <h2>Your Orders:</h2>
      <div v-for="order in orders" :key="order.id">
        {{ Math.round(order.total * 100) / 100 }} €
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
