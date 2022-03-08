<template>
  <h1 class="my-5">Registro de usuarios</h1>
  <form  @submit.prevent="registerUser">
    <input
      class="form-control my-2"
      type="email"
      v-model.trim="email"
      placeholder="email">
    <input
      class="form-control my-2"
      type="password"
      v-model.trim="password"
      placeholder="password">
    <input 
      class="form-control my-2"
      type="password" 

      v-model.trim="rpassword"
      placeholder="repeat password">

    <button class="btn btn-primary" :disabled="isEnabled" type="submit">Registrar</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      rpassword: '',
    }
  },
  computed: {
    isEnabled() {
      return (this.password !== this.rpassword || (this.password.length<5)) || !this.email.includes('@') ;
    }
  },
  methods: {
    ...mapActions(['REGISTER_USER']),
    registerUser() {
      this.REGISTER_USER({email: this.email, password: this.password})
      this.clearData();
    },
    clearData() {
      this.email = '';
      this.password = '';
      this.rpassword = '';
    },
  }
}
</script>