<template>
<div class="container-fluid px-0" id="body">
  <Login/>
</div>
  
  <router-view/>
</template>

<script>
import Login from './components/Login.vue'
export default {
  components : { Login }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500&display=swap');
  *{
    font-family: 'Poppins', sans-serif;
  }
  :root {
    --primary : #4db9a5;
    --secondary : #f4f8f7;
  }
</style>
