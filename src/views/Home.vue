<template>
  <form @submit.prevent="handlerForm">
    <t-input :task="task"></t-input>
  </form>
  <hr>
  <task-list></task-list>
</template>

<script>
import { mapActions } from 'vuex';
import TInput from '@/components/TInput.vue';
import TaskList from '@/components/TaskList.vue';

const shortid = require('shortid');

export default {
  name: 'Home',
  components: {
    TInput,
    TaskList,
  },
  data() {
    return {
      task: {
        id: '',
        name: '',
        categories: [],
        state: '',
        numberValue: 0,
      },
    };
  },
  methods: {
    ...mapActions(['ADD_TASKS', 'LOAD_LOCAL_STORAGE']),
    handlerForm() {
      if(this.task.name.trim() === '') {
        console.log('Vacio');
        return;
      }
      this.generateId();
      this.ADD_TASKS(this.task);
      this.clearForm();
    },
    clearForm() {
      this.task = {
        id: '',
        name: '',
        categories: [],
        state: '',
        numberValue: 0,
      }
    },
    generateId() {
      this.task.id = shortid.generate();
    },
  },
  created() {
    this.LOAD_LOCAL_STORAGE();
  },
}
</script>
