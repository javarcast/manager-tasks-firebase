<template>
  <h1 class="my-5">Ingreso de usuarios</h1>
  <div class="alert alert-danger" v-show="error.type !== null">
    {{error.message}}
  </div>
  <form  @submit.prevent="loginUser">
    <input
      :class="[error.type === 'email'? 'is-invalid' : '']"
      class="form-control my-2"
      type="email"
      v-model.trim="email"
      placeholder="email">
    <input
     :class="[error.type === 'password'? 'is-invalid' : '']"
      class="form-control my-2"
      type="password"
      v-model.trim="password"
      placeholder="password">

    <button :disabled="isEnabled" class="btn btn-primary" type="submit">Login</button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
   methods: {
    ...mapActions(['LOGIN_USER', 'CLEAR_ERROR']),
    async loginUser() {
      await this.LOGIN_USER({email: this.email, password: this.password})
      if(this.error.type !== null)
        return;
      this.clearData();
    },
    clearData() {
      this.email = '';
      this.password = '';
    },
  },
  created() {
    this.CLEAR_ERROR();
  },
  computed: {
    isEnabled() {
      return this.password.length<5 || !this.email.includes('@') ;
    },
    ...mapState(['error']),
  },
}
</script>