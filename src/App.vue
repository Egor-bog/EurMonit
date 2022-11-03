<template>
  <HeaderNav msg="Welcome to Your Vue.js App"/>
  <router-view></router-view>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue';


export default {
  name: 'App',
  components: {
    HeaderNav
},
mounted() 
  {
    console.log('login desktop start');
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #007ffd;
}
</style>
