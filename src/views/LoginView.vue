<template>
  <main>
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm4 elevation-6>
          <v-toolbar class="blue darken-4">
            <v-toolbar-title class="white--text"
              ><h4>Welcome</h4></v-toolbar-title
            >
          </v-toolbar>
          <v-card>
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form" @submit.prevent="login">
                  <v-text-field
                    label="Enter your e-mail address"
                    v-model="credentials.email"
                    :rules="emailRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Enter your password"
                    v-model="credentials.password"
                    min="8"
                    type="password"
                    :rules="passwordRules"
                    required
                  ></v-text-field>
                  <v-layout justify-space-between>
                    <v-btn
                      type="submit"
                      :class="{
                        'blue darken-4 white--text': valid,
                        disabled: !valid,
                      }"
                      >Login</v-btn
                    >
                  </v-layout>
                </v-form>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>
<script>
export default {
  data() {
    return {
      valid: false,
      credentials:{
        email: "",
        password: "",
      },
      passwordRules: [(v) => !!v || "Password is required"],
      // eslint-disable-next-line
      emailRules: [(v) => !!v || "E-mail is required", (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid"]
    };
  },
  
  methods: {
    login() {
      if (this.$refs.form.validate()) {
     this.$axios.post('/auth', this.credentials)
       .then((response) => {
         if(response.data.status == '200'){
            localStorage.setItem('access_token', response.data.response)
            this.$router.push('/users')
              return response;
           }
           localStorage.setItem('access_token', '')
              return;
              })
         .catch((error) => {
           console.log(error);
         })
      }
    },
  },
};

</script>
