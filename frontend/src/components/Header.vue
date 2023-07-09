<template>
  <div class="header">
    <div class="username">{{ user }}</div>
    <button class="quit-button">Выйти</button>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      user: "Петровук Кирилл",
    }
  },
}
</script>


<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  color: white;
  background-color: rgb(36, 36, 36);
  border-radius: 0 0 10px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quit-button {
  padding: 10px 20px;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 0 5px #f44336;
}

.quit-button:hover {
  background-color: #d32f2f;
  box-shadow: 0 0 8px #f44336;
}

.quit-button:focus {
  outline: none;
}

.quit-button:active {
  background-color: #b71c1c;
  box-shadow: 0 0 3px #f44336;
}
</style>
