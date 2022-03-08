<template>
  <h1>Editando Task - {{task.name}}</h1>
  <form @submit.prevent="editTask">
    <t-input :task="task"></t-input>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import TInput from '@/components/TInput.vue';

export default {
  components: {
    TInput,
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(['UPDATE_TASK', 'UPDATE_TASKS']),
    init() {
      const id = this.$route.params.id;
      this.UPDATE_TASK(id);
    },
    editTask() {
      this.UPDATE_TASKS(this.task);
      this.$router.push('/');
    },
  },
  computed: {
    ...mapState(['task']),
  }
}
</script>

<style>

</style>