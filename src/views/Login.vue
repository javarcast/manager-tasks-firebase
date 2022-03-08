<template>
  <h1 class="my-5">Ingreso de usuarios</h1>
  <form  @submit.prevent="loginUser">
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

    <button :disabled="isEnabled" class="btn btn-primary" type="submit">Login</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
   methods: {
    ...mapActions(['LOGIN_USER']),
    loginUser() {
      this.LOGIN_USER({email: this.email, password: this.password})
      this.clearData();
    },
    clearData() {
      this.email = '';
      this.password = '';
    },
  },
  computed: {
    isEnabled() {
      return this.password.length<5 || !this.email.includes('@') ;
    }
  },
}
</script>