<template>
<v-sheet min-height="70vh" rounded="lg" class="pa-3">
  <v-row>
    <v-col sm="12" md="6" lg="4" offset-md="3" offset-lg="4">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-btn color="primary" class="mb-3" @click.prevent="forgotPassword">
          Email me a reset link
        </v-btn>

        <v-alert v-if="error" type="error">{{ error }}</v-alert>
        <v-alert v-if="success" type="success">{{ success }}</v-alert>
      </v-form>
    </v-col>
  </v-row>
</v-sheet>
</template>

<script>
export default {
  middleware: 'guest',
  data() {
    return {
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      success: null,
      error: null,
    }
  },
  methods: {
    async forgotPassword() {
      try {
        this.error = null
        await this.$axios.post('auth/forgot-password', {
          email: this.email,
        })
        
        this.success = `A reset password link has been sent to your email account. \
 Please click on the link to complete the password reset.`
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message
      }
    },
  },
}
</script>

<style>
</style>