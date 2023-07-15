<template>
  <div class="header">
    <div class="user-block">

      <!-- Username -->
      <div class="username">
        {{ user }}
      </div>

      <!-- Settings -->
      <div class="settings-svg" @click="showPopup">
        <svg data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width="20px"
          height="20px" fill="currentColor">
          <title />
          <path d="M64,39A25,25,0,1,0,89,64,25,25,0,0,0,64,39Zm0,44A19,19,0,1,1,83,64,19,19,0,0,1,64,83Z" />
          <path
            d="M121,48h-8.93a1,1,0,0,1-.94-.68,49.9,49.9,0,0,0-2-4.85,1,1,0,0,1,.18-1.15L115.62,35a7,7,0,0,0,0-9.9L102.89,12.38a7,7,0,0,0-9.9,0l-6.31,6.31a1,1,0,0,1-1.15.18,49.76,49.76,0,0,0-4.85-2,1,1,0,0,1-.68-.94V7a7,7,0,0,0-7-7H55a7,7,0,0,0-7,7v8.93a1,1,0,0,1-.68.94,49.9,49.9,0,0,0-4.85,2,1,1,0,0,1-1.15-.18L35,12.38a7,7,0,0,0-9.9,0L12.38,25.11a7,7,0,0,0,0,9.9l6.31,6.31a1,1,0,0,1,.18,1.15,49.76,49.76,0,0,0-2,4.85,1,1,0,0,1-.94.68H7a7,7,0,0,0-7,7V73a7,7,0,0,0,7,7h8.93a1,1,0,0,1,.94.68,49.9,49.9,0,0,0,2,4.85,1,1,0,0,1-.18,1.15L12.38,93a7,7,0,0,0,0,9.9l12.73,12.73a7,7,0,0,0,9.9,0l6.31-6.31a1,1,0,0,1,1.15-.18,49.76,49.76,0,0,0,4.85,2,1,1,0,0,1,.68.94V121a7,7,0,0,0,7,7H73a7,7,0,0,0,7-7v-8.93a1,1,0,0,1,.68-.94,49.9,49.9,0,0,0,4.85-2,1,1,0,0,1,1.15.18L93,115.62a7,7,0,0,0,9.9,0l12.73-12.73a7,7,0,0,0,0-9.9l-6.31-6.31a1,1,0,0,1-.18-1.15,49.76,49.76,0,0,0,2-4.85,1,1,0,0,1,.94-.68H121a7,7,0,0,0,7-7V55A7,7,0,0,0,121,48Zm1,25a1,1,0,0,1-1,1h-8.93a7,7,0,0,0-6.6,4.69,43.9,43.9,0,0,1-1.76,4.26,7,7,0,0,0,1.35,8l6.31,6.31a1,1,0,0,1,0,1.41L98.65,111.38a1,1,0,0,1-1.41,0l-6.31-6.31a7,7,0,0,0-8-1.35,43.88,43.88,0,0,1-4.27,1.76,7,7,0,0,0-4.68,6.6V121a1,1,0,0,1-1,1H55a1,1,0,0,1-1-1v-8.93a7,7,0,0,0-4.69-6.6,43.9,43.9,0,0,1-4.26-1.76,7,7,0,0,0-8,1.35l-6.31,6.31a1,1,0,0,1-1.41,0L16.62,98.65a1,1,0,0,1,0-1.41l6.31-6.31a7,7,0,0,0,1.35-8,43.88,43.88,0,0,1-1.76-4.27A7,7,0,0,0,15.93,74H7a1,1,0,0,1-1-1V55a1,1,0,0,1,1-1h8.93a7,7,0,0,0,6.6-4.69,43.9,43.9,0,0,1,1.76-4.26,7,7,0,0,0-1.35-8l-6.31-6.31a1,1,0,0,1,0-1.41L29.35,16.62a1,1,0,0,1,1.41,0l6.31,6.31a7,7,0,0,0,8,1.35,43.88,43.88,0,0,1,4.27-1.76A7,7,0,0,0,54,15.93V7a1,1,0,0,1,1-1H73a1,1,0,0,1,1,1v8.93a7,7,0,0,0,4.69,6.6,43.9,43.9,0,0,1,4.26,1.76,7,7,0,0,0,8-1.35l6.31-6.31a1,1,0,0,1,1.41,0l12.73,12.73a1,1,0,0,1,0,1.41l-6.31,6.31a7,7,0,0,0-1.35,8,43.88,43.88,0,0,1,1.76,4.27,7,7,0,0,0,6.6,4.68H121a1,1,0,0,1,1,1Z" />
        </svg>
      </div>
    </div>

    <!-- Logout -->
    <u-button class="quit-button" @click="logout">Выйти</u-button>

    <!-- Модальное окно настроек где можно удалить тэги и авторов -->
    <transition name="fade">
      <u-popup class="modal-delete" v-show="isPopupVisible" @closePopup="showPopup">
        <div class="tag-delete">
          <p class="p-text">Удаление тэга</p>
          <u-select 
            class="select-to-delete" 
            :options="allTags" 
            :text='"Выберите тэг для удаления"' 
            v-model="selectedTag" 
            value-field="id"
          ></u-select>
          <transition name="fade">
            <div v-if="successTagMessage" class="success">Тэг успешно удален</div>
          </transition>

          <u-button class="quit-button" @click="deleteTag">Удалить тэг</u-button>
          
        </div>
        <div class="author-delete">
          <p class="p-text">Удаление автора</p>
          <u-select 
            class="select-to-delete" 
            :options="allAuthors" 
            :text='"Выберите автора для удаления"' 
            v-model="selectedAuthor" 
            value-field="id"
          ></u-select>

          <transition name="fade">
            <div v-if="successAuthorMessage" class="success">Автор успешно удален</div>
          </transition>

          <u-button class="quit-button" @click="deleteAuthor">Удалить автора</u-button>
          
        </div>
      </u-popup>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      user: 'Петровчук Кирилл',
      isPopupVisible: false, // Состояние видимости модального окна
      selectedAuthor: null,
      selectedTag: null,
    }
  },
  computed: {
    ...mapGetters([
      'allAuthors', 'successAuthorMessage',
      'allTags', 'successTagMessage',
    ]),
  },
  methods: {
    ...mapMutations(['deleteToken']),
    ...mapActions(['deleteAuthorById', 'deleteTagById']),
    // Выход
    logout() {
      this.deleteToken()
    },
    // Скрыть/показать модальное окно
    showPopup() {
      this.selectedAuthor = "";
      this.selectedTag = "";
      this.isPopupVisible = !this.isPopupVisible;
    },
    // Удаление тэга
    deleteTag() {
      this.deleteTagById({id: this.selectedTag})
      this.selectedTag = "";
    },
    // Удаление автора
    deleteAuthor() {
      this.deleteAuthorById({ id: this.selectedAuthor })
      this.selectedAuthor = "";
    }
  }
}
</script>


<style scoped>

.success {
  color: rgb(2, 211, 2);
  margin: 0 auto;
  padding: 10px;
}

.select-to-delete {
  margin: 10px 0 15px 0;
}

.tag-delete,
.author-delete {
  display: flex;
  flex-direction: column;
  margin: 30px;
}

.modal-delete {
  color: black;
}

.user-block {
  display: flex;
  align-items: flex-start;
}

.username {
  margin-right: 8px;
}

.settings-svg {
  cursor: pointer;
  transition: 1s;
  transform-origin: center;
}

.settings-svg:hover {
  transform: scale(1.2) rotate(20deg);
  transition: 1s;
}

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
