<template>
  <header-bar></header-bar>
  <div class="container">
    <router-view/>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import HeaderBar from '@/components/HeaderBar.vue';

export default {

  components: {
    HeaderBar,
  },
  methods: {
      ...mapActions(['LOAD_LOCAL_STORAGE'])
  },
  created() {
    this.LOAD_LOCAL_STORAGE();
  }
}
</script>