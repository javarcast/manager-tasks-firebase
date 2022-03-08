<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Categorias</th>
        <th scope="col">Estado</th>
        <th scope="col">Numero</th>
        <th scope="col">Acción</th>
      </tr>
    </thead>
    <tbody v-if="tasks.length >0 &&(typeof(tasks) !== 'Object')">
      <tr v-for="task of tasks" :key="task.id">
        <th scope="row">{{task.id}}</th>
        <td>{{task.name}}</td>
        <td>
          <span  class="badge badge-pill badge-secondary mx-1" v-for="(category, index) of task.categories" :key="index">  {{category}}  </span> 
        </td>
        <td>{{task.state}}</td>
        <td>{{task.numberValue}}</td>
        <td class="d-flex justify-between">
          <button class="btn btn-danger mx-1 btn-sm" @click="DELETE_TASK(task.id)"> Eliminar </button>
          <router-link :to="{ name: 'edit-task', params: { id: task.id }}" class="btn btn-warning btn-xs">Editar</router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['tasks']),
  },
  methods: {
    ...mapActions(['DELETE_TASK']),
  }
}
</script>
