<template>
  <div id="app">
    <div class="wrapper">
      <router-view>

      </router-view>
    </div>
  </div>
</template>

<script>
export default {
  // При запуске приложения если токен есть
  // будем выгружать из localStorage 
  // и передавать в state.token
  created() {
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.commit('setToken', token)
    }
  }
}
</script>


<style>
* {
  padding: 0;
  margin: 0;
  font-family: 'Russo One', sans-serif;

}
</style>
