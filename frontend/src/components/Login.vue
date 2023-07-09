<template>
  <div class="login-form">
    Заделка на будущее
    <h2>Вход</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Имя пользователя:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button class="create-btn" type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Здесь вы можете выполнить логику аутентификации
      console.log('Выполняется вход...');
      console.log('Имя пользователя:', this.username);
      console.log('Пароль:', this.password);
      
      // После успешной аутентификации можно выполнить редирект на другую страницу
    }
  }
}
</script>

<style scoped>
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

label {
  display: block;
  margin-bottom: 5px;
}

input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: -webkit-fill-available;
}

input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.create-btn {
  padding: 10px 20px;
  background-color: #5de633;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 0 5px #5de633;
  margin: 15px 0 15px 0;
  width: -webkit-fill-available;
}

.create-btn:hover {
  background-color: #5add32;
  box-shadow: 0 0 8px #5de633;
}

.create-btn:focus {
  outline: none;
}

.create-btn:active {
  background-color: #5add32;
  box-shadow: 0 0 3px #5de633;
}
</style>