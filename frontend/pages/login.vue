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
          <v-text-field
            v-model="password"
            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
            :type="passwordShow ? 'text' : 'password'"
            :rules="passwordRules"
            label="Password"
            required
            @click:append="passwordShow = !passwordShow"
          ></v-text-field>
          <v-btn color="primary" class="mb-3" @click.prevent="login">
            Login
          </v-btn>

          <v-alert v-if="error" type="error">{{ error }}</v-alert>

          <div>
            <p>
              Don't have an account?
              <nuxt-link to="/register">Register</nuxt-link>
            </p>

            <p>
              <nuxt-link to="/forgot-password">Forgot Password?</nuxt-link>
            </p>
          </div>

          {{ $store.state.user }}
        </v-form>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  middleware: 'guest',
  data: () => ({
    valid: true,
    error: null,
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [(v) => !!v || 'Password is required'],
    passwordShow: false,
  }),
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    async login() {
      this.error = null
      this.$refs.form.validate()
      if (!this.valid) {
        return
      }
      try {
        await this.$auth.loginWith('local', {
          data: {
            identifier: this.email,
            password: this.password,
          },
        })
        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message
      }
    },
  },
}
</script>

<style></style>
