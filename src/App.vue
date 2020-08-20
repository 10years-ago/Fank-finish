<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    //此方法刷新页面时也会执行
    window.addEventListener('beforeunload',()=>{
      localStorage.school = this.$store.state.school
      localStorage.perm = this.$store.state.perm 
    });
    this.$store.commit('schoolChange',localStorage.school || '')
    this.$store.commit('permChange',localStorage.perm || '')
  },
}
</script>

<style lang="scss">
@import 'assets/css/index.scss';
</style>
