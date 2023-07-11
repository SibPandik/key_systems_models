<template>
  <button :className="buttonClass" v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'UButton',
  props: {
    className: {
      type: String,
      default: 'create-btn',
    },
  },
  computed: {
    buttonClass() {
      return this.class;
    },
  },
}
</script>

<style scoped>
/* Красная кнопка
class='quit-button' */
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

/* Зеленая кнопка
class='create-btn' */

.create-btn {
  padding: 10px 20px;
  background-color: #5de633;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 0 5px #5de633;
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

@media (max-width: 460px) {
  .create-btn {
    font-size: 18px;
    width: -webkit-fill-available;
  }
}
</style>