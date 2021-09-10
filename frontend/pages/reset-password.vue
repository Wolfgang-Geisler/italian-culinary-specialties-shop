<template>
<v-sheet min-height="70vh" rounded="lg" class="pa-3">
  <v-row>
    <v-col sm="12" md="6" lg="4" offset-md="3" offset-lg="4">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="password"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordShow ? 'text' : 'password'"
          :rules="passwordRules"
          label="Password"
          required
          @click:append="passwordShow = !passwordShow"
        ></v-text-field>
        <v-text-field
          v-model="passwordConfirm"
          :append-icon="passwordShowConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordShowConfirm ? 'text' : 'password'"
          :rules="[
            (v) => !!v || 'Please confirm your password',
            (v) => password === v || 'Passwords do not match',
          ]"
          label="Confirm Password"
          required
          @click:append="passwordShowConfirm = !passwordShowConfirm"
        ></v-text-field>
        <v-btn color="primary" class="mb-3" @click.prevent="resetPassword">
          Reset Password
        </v-btn>

        <div>
          <p>
            Already got an account? <nuxt-link to="/login">Login</nuxt-link>
          </p>
        </div>

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
  asyncData(context) {
    if (!context.route.query.code) context.redirect('/forgot-password')
    else
      return {
        code: context.route.query.code,
      }
  },
  data() {
    return {
      success: null,
      error: null,
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) =>
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(v) ||
          'Minimum eight characters, at least one letter and one number',
      ],
      passwordConfirm: '',
    }
  },
  methods: {
    async resetPassword() {
      this.error = null
      if (this.password !== this.passwordConfirm) {
        this.error = 'Passwords do not match.'
        return
      }
      try {
        await this.$axios.post('auth/reset-password', {
          code: this.code,
          password: this.password,
          passwordConfirmation: this.passwordConfirm,
        })
        
        this.success =
          'Password updated successfully. You can now use it to log in to your account.'
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message
      }
    },
  },
}
</script>

<style>
</style>