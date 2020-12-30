<template>
  <v-card class="pa-6">
    <v-card-title>Register Form</v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="username"
        :counter="10"
        :rules="usernameRules"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :counter="50"
        :rules="passwordRules"
        label="Password"
        required
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Register
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
    </v-form>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    username: "",
    usernameRules: [
      (v) => !!v || "username is required",
      (v) =>
        (v && v.length <= 10) || "username must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "password is required",
      (v) => (v && v.length > 6) || "password must be more than 6 characters",
    ],
  }),

  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        let user = {
          username: this.username,
          email: this.email,
          password: this.password,
        };
        let rtn = await this.$axios.$post("/api/register", user);
        console.log({user,rtn})
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>