<template>
  <v-stepper v-model="currentStep">
    <v-stepper-header>
      <v-stepper-step :complete="currentStep > 1" step="1">
        Cart
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="currentStep > 2" step="2">
        Shipping
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="currentStep > 3" step="3">
        Place Order
      </v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-row>
          <v-col v-for="item in cart.items" :key="item.id" cols="12">
            <v-card elevation="1" outlined>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div class="d-flex">
                  <v-avatar class="ma-3" size="125" tile>
                    <v-img
                      :src="
                        getStrapiMedia(item.product.image.formats.thumbnail.url)
                      "
                    ></v-img>
                  </v-avatar>
                  <div>
                    <v-card-title> {{ item.product.name }} </v-card-title>
                    <v-card-subtitle
                      >{{ price(item.product.price) }} €</v-card-subtitle
                    >
                    <v-card-subtitle
                      >Total:
                      {{ price(item.product.price * item.amount) }}
                      €</v-card-subtitle
                    >
                  </div>
                </div>

                <v-card-actions>
                  <v-text-field
                    v-model="item.amount"
                    type="number"
                    min="1"
                    class="shrink"
                    append-outer-icon="mdi-plus"
                    prepend-icon="mdi-minus"
                    @click:append-outer="increment(index)"
                    @click:prepend="decrement(index)"
                    >Amount</v-text-field
                  >

                  <v-btn
                    class="ml-2"
                    color="warning"
                    text
                    @click.prevent="remove(item.product.id)"
                    ><v-icon>mdi-trash-can</v-icon></v-btn
                  >
                </v-card-actions>
              </div>
            </v-card>
          </v-col>
          <v-col
            v-if="cart.items.length"
            cols="12"
            class="pa-3 d-flex justify-space-between"
          >
            <v-btn color="primary" @click.prevent="back"
              >Continue Shopping</v-btn
            >
            <v-btn color="primary" @click.prevent="currentStep++"
              >Add Shipping Details
              <v-icon class="mr-2">mdi-arrow-right</v-icon></v-btn
            >
          </v-col>
          <v-col v-if="!cart.items.length">
            <v-sheet min-height="70vh" rounded="lg" class="pa-3">
              <v-alert type="info"
                ><p>There are no items in your cart</p>
                <v-btn color="primary" to="/products"
                  >Start shopping
                  <v-icon class="ml-2">mdi-arrow-right</v-icon></v-btn
                ></v-alert
              >
            </v-sheet>
          </v-col>
        </v-row>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-row>
          <v-col cols="12">
            <v-form>
              <v-text-field
                v-model="name"
                label="Name"
                required
                :rules="[(v) => !!v || 'Name is required']"
              ></v-text-field>
              <v-text-field
                v-model="street"
                label="Street"
                required
                :rules="[(v) => !!v || 'Street is required']"
              ></v-text-field>
              <v-text-field
                v-model="postcode"
                label="Postcode"
                required
                :rules="[(v) => !!v || 'Postcode is required']"
              ></v-text-field>
              <v-text-field
                v-model="city"
                label="City"
                required
                :rules="[(v) => !!v || 'City is required']"
              ></v-text-field>
            </v-form>
          </v-col>
          <v-col
            v-if="cart.items.length"
            cols="12"
            class="pa-3 d-flex justify-space-between"
          >
            <v-btn color="primary" @click.prevent="currentStep--"
              ><v-icon class="mr-2">mdi-arrow-left</v-icon> Back to cart</v-btn
            >
            <v-btn
              :disabled="!valid"
              color="primary"
              @click.prevent="valid ? currentStep++ : 0"
              >Place Order <v-icon class="mr-2">mdi-arrow-right</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-row v-if="!success && !error">
          <v-col v-for="item in cart.items" :key="item.id" cols="12">
            <v-card elevation="1" outlined>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div class="d-flex">
                  <v-avatar class="ma-3" size="125" tile>
                    <v-img
                      :src="
                        getStrapiMedia(item.product.image.formats.thumbnail.url)
                      "
                    ></v-img>
                  </v-avatar>
                  <div>
                    <v-card-title> {{ item.product.name }} </v-card-title>
                    <v-card-subtitle>{{
                      item.product.description
                    }}</v-card-subtitle>
                  </div>
                </div>
                <div class="d-flex align-end">
                  <v-card-subtitle
                    >{{ item.amount }}<v-icon class="mx-2">mdi-times</v-icon>
                    {{ item.product.price }} €</v-card-subtitle
                  >
                  <v-card-subtitle
                    >Total:
                    {{ item.product.price * item.amount }}
                    €</v-card-subtitle
                  >
                </div>
              </div>
            </v-card>
            <v-alert v-if="error" type="error" class="mt-4">{{
              error
            }}</v-alert>
          </v-col>
          <v-col
            v-if="cart.items.length"
            cols="12"
            class="pa-3 d-flex justify-space-between"
          >
            <v-btn color="primary" @click.prevent="currentStep--"
              ><v-icon class="mr-2">mdi-arrow-left</v-icon> Back to
              shipping</v-btn
            >
            <v-btn
              :disabled="!valid"
              color="primary"
              @click.prevent="placeOrder()"
              >Place your order for {{ total }} €
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="success">
          <v-col>
            <v-alert type="success">{{ success }}</v-alert>
          </v-col>
        </v-row>
        <v-row v-if="error">
          <v-col>
            <v-alert type="error">{{ error }}</v-alert>
          </v-col>
        </v-row>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapGetters } from 'vuex'
import { getStrapiMedia } from '../utils/medias'
export default {
  data() {
    return {
      currentStep: 1,
      name: '',
      street: '',
      postcode: '',
      city: '',
      error: null,
      success: null,
    }
  },
  computed: {
    ...mapGetters(['cart', 'loggedInUser']),
    total() {
      let total = 0
      this.$store.state.cart.items.forEach((item) => {
        total += item.product.price * item.amount
      })
      return this.price(total)
    },
    valid() {
      if (this.name && this.street && this.postcode && this.city) {
        return true
      }
      return false
    },
  },
  methods: {
    getStrapiMedia,
    increment(index) {
      this.$store.commit('cart/increaseAmount', index)
    },
    decrement(index) {
      this.$store.commit('cart/decreaseAmount', index)
    },
    remove(productId) {
      this.$store.commit('cart/remove', productId)
    },
    price(price) {
      return (Math.round(price * 100) / 100).toFixed(2)
    },
    back() {
      this.$router.push('/products')
    },
    async placeOrder() {
      const newOrder = {
        status: 'unpaid',
        orderLines: [],
      }
      let total = 0
      this.cart.items.forEach((item) => {
        total += item.amount * item.product.price
        newOrder.orderLines.push({
          product: item.product,
          amount: item.amount,
          productPrice: item.product.price,
        })
      })
      newOrder.total = total
      newOrder.user = this.loggedInUser
      console.log(newOrder)
      try {
        await this.$axios.$post('/orders', newOrder)
        this.success = 'Order has been successfully created!'
        this.$store.commit('cart/clear')
      } catch (error) {
        this.error = error
      }
    },
  },
}
</script>

<style></style>
