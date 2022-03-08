<template>
  <header>
    <nav class="navbar navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Formularios</router-link>
      <div class="d-flex" v-if="isAuth">
        <router-link class="btn btn-dark" to="/">Tareas</router-link>
        <button class="btn btn-light" @click="LOGOUT">Logout</button>
      </div>
      <div v-else class="d-flex">
        <router-link class="btn btn-dark mx-2" to="/login">Login</router-link>
        <router-link class="btn btn-light" to="/register">Registrar</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuth']),
  },
  methods: {
    ...mapActions(['LOGOUT']),
  }

}
</script>
