<template>
  <div class="joke-wrapper">
    <div class="text">Случайная шутка</div>
    <div class="joke">[{{ jokeData }}]</div>
  </div>
</template>

<script>
export default {
  name: 'RandomJoke',
  data() {
    return {
      jokeData: 'Загрузка...',
    }
  },
  created() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch('https://geek-jokes.sameerkumar.website/api', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.jokeData = data;
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  },
}
</script>

<style scoped>
.joke-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(36, 36, 36);
    margin: 15px;
    color: white;
    border-radius: 12px;
    padding: 15px;
}

.text {
    font-size: 20px;
}
.joke {
    margin-top: 15px;
}
</style>