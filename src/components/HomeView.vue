<script setup>

</script>
<template>
  <div class="homeview">
        <div class="content">
            <h1>Welcome to the WizGlobal</h1>
            <p>Login To continue</p>
            <router-link to="/login"class="btn btn-primary">Login</router-link>
            <p>Dont have an account?</p>
            <router-link to="/register" class="btn border-bottom btn-sm">Register here</router-link>
        </div>
  </div>
</template>
<style scoped>
.homeview {
  background-color: blueviolet;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
    text-align: center;
}
</style>