<template>
  <v-sheet min-height="70vh" rounded="lg" class="pa-3">
    <v-row>
      <v-col sm="12" md="6" lg="4" offset-md="3" offset-lg="4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            ref="username"
            v-model="username"
            :counter="20"
            :rules="usernameRules"
            label="Username"
            placeholder="username"
            required
          ></v-text-field>
          <v-text-field
            ref="email"
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            placeholder="max.mustermann@gmail.com"
            required
          ></v-text-field>
          <v-text-field
            ref="password"
            v-model="password"
            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
            :type="passwordShow ? 'text' : 'password'"
            :rules="passwordRules"
            label="Password"
            required
            @click:append="passwordShow = !passwordShow"
          ></v-text-field>
          <v-text-field
            ref="passwordConfirm"
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
          <v-checkbox
            v-model="termsAgreed"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="I agree that I have read the Terms and Conditions"
            required
          ></v-checkbox>
          <v-btn color="primary" class="mb-3" @click.prevent="register">
            Register
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
  data: () => ({
    valid: true,
    success: null,
    error: null,
    username: '',
    usernameRules: [
      (v) => !!v || 'Username is required',
      (v) =>
        (v && v.length <= 20) || 'Username must be less than 20 characters',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(v) ||
        'Minimum eight characters, at least one letter and one number',
    ],
    passwordConfirm: '',
    termsAgreed: false,
    passwordShow: false,
    passwordShowConfirm: false,
  }),

  methods: {
    async register() {
      // fehlermeldungen zurücksetzen
      this.error = null
      // formular validieren
      this.$refs.form.validate()
      // wenn formular fehlerhaft abbrechen
      // guard clause
      if (!this.valid) {
        return
      }
      try {
        // token zurücksetzen
        this.$axios.setToken(false)
        // user registrieren
        await this.$axios.post('auth/local/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        // success message befüllen
        this.success = `A confirmation link has been sent to your E-Mail account. \
  Please click on the link to complete the process.`
      } catch (e) {
        // fehlermeldung
        this.error = e.response.data.message[0].messages[0].message
      }
    },
  },
}
</script>

<style></style>
