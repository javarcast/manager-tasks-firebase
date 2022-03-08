<template>
  <h1 class="my-5">Registro de usuarios</h1>
  <div class="alert alert-danger" v-show="error.type !== null">
    {{error.message}}
  </div>
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
import { mapActions, mapState } from 'vuex';

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
    },
    ...mapState(['error']),
  },
  created() {
    this.CLEAR_ERROR();
  },
  methods: {
    ...mapActions(['REGISTER_USER', 'CLEAR_ERROR']),
    async registerUser() {
      await this.REGISTER_USER({email: this.email, password: this.password})
      if(this.error.type !== null)
        return;
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