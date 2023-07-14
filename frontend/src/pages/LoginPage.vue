<template>
  <div class="login-form">
    <h2>Вход</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <u-input type="text" placeholder="username" v-model="username"/>
      </div>
      <div class="form-group">
        <u-input type="password" placeholder="password" v-model="password"/>
      </div>
      <u-button class="create-btn" type="submit">Войти</u-button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['getToken']),
    login() {
      this.getToken({ username: this.username, password: this.password })
    }
  }
}
</script>

<style scoped>

h2 {
  margin-bottom: 25px;
}

.login-form {
  max-width: 300px;
  margin: 50px auto;
  background-color: rgb(36, 36, 36);;
  padding: 25px;
  border-radius: 16px;
  color: white;

}

.form-group {
  margin-bottom: 15px;
}


</style>