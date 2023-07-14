<template>
  <div class="header">
    <div class="username">{{ user }}</div>
    <u-button class="quit-button" @click="logout">Выйти</u-button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      user: "Петровчук Кирилл",
    }
  },
  methods: {
    ...mapMutations(['deleteToken']),
    logout() {
      this.deleteToken()
    }
  }
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
</style>
