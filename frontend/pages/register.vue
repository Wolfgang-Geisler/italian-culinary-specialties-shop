<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-card-text>
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
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click.prevent="register">
            Register
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: 'guest',
  data: () => ({
    valid: true,
    success: null,
    error: null,
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    termsAgreed: false,
    passwordShow: false,
    passwordShowConfirm: false,
  }),

  methods: {
    async register() {
      // fehlermeldungen zurücksetzen
      this.error = null;
       // formular validieren
      this.$refs.form.validate();
      // wenn formular fehlerhaft abbrechen
      // guard clause
      if(!this.valid) {
        return
      }
      try {
        // token zurücksetzen
        this.$axios.setToken(false);
        // user an der strapi registrieren
        await this.$axios.post('auth/local/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        // success message befüllen
        this.success = `A confirmation link has been sent to your E-Mail account. \
  Please click on the link to complete the process.`
      } catch(e) {
        // fehlermeldung
        this.error = e.response.data.message[0].messages[0].message  
      }
    },
  },
}
</script>

<style></style>
