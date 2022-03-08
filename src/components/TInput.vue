<template>
  <input 
      v-model="task.name" 
      type="text" 
      class="form-control my-2" 
      placeholder="Ingrese Nombre">
    <div class="form-check form-check-inline">
      <input 
        class="form-check-input" 
        type="checkbox" 
        v-model="task.categories" 
        id="check-1" 
        value="javascript" >
      <label class="form-check-label" for="check-1">Javascript</label>
    </div>
    <div class="form-check form-check-inline">
      <input 
        class="form-check-input" 
        v-model="task.categories" 
        value="nodejs" 
        type="checkbox" 
        id="check-2" >
      <label class="form-check-label" for="check-2">NodeJS</label>
    </div>

    <div class="mt-2">
      <div class="form-check form-check-inline">
        <input 
          class="form-check-input" 
          v-model="task.state" 
          value="urgente" 
          type="radio" 
          id="radio-1" >
        <label class="form-check-label" for="radio-1">Urgente</label>
      </div>
      <div class="form-check form-check-inline">
        <input 
          class="form-check-input" 
          v-model="task.state" 
          value="relax" 
          type="radio" 
          id="radio-2" >
        <label class="form-check-label" for="radio-2">Relax</label>
      </div>
    </div>

    <div class="mt-2">
      <input class="form-control" type="number" v-model.number="task.numberValue">
    </div>

    <button class="btn btn-dark mt-2 btn-block" :disabled="canProcess" type="submit"> Procesar </button>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    }
  },
   computed: {
    canProcess() {
      return this.task.name === ''
    }
  },
}
</script>