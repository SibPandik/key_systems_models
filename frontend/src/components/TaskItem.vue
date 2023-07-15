<template>
  <div class="task-item-container">

    <!-- Если в posts что-то есть -->
    <transition-group name="slide-fade" v-show="posts.length > 0">
      
      <!-- Вывод постов таблицей -->
      <table class="task-item" :class="{ 'is-made': post.is_made }" v-for="post in posts" :key="post.id">
        <tr>
          <td class="title"> {{ `№${post.id}. ${post.title}` }}</td>
          <td class="options">
            <div class="tags-date-wrapper">
              <div class="tags">{{ post.tags.join(' / ') }}</div>
              <div class="separator"></div>
              <div class="date">{{ formatDate(post.date) }}</div>
              <div class="separator"></div>
            </div>
            <div class="author-options-wrapper">
              <div class="author">{{ post.author }}</div>
              <div class="separator"></div>
              <div class="options-block">
                <div class="is-made-checkbox" @click="updateCheckbox(post, $event)">
                  <u-input type="checkbox" v-model="post.is_made" />
                </div>

                <!-- Изменение поста -->
                <div class="edit" @click="showPopup(post)">
                  <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" width="15px" height="15px" viewBox="0 0 528.899 528.899"
                    xml:space="preserve">
                    <g>
                      <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
                          c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
                          C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
                          L27.473,390.597L0.3,512.69z" />
                    </g>
                  </svg>
                </div>

                <!-- Удаление -->
                <div class="trash" @click="$emit('remove', post.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash"
                    viewBox="0 0 16 16">
                    <path
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                  </svg>
                </div>
                
                <!-- Модальное окно изменения поста -->
                <transition name="fade">
                  <u-popup v-show="isPopupVisible && activeItemId === post.id" @closePopup="showPopup">
                    <form @submit.prevent="editPost">
                      <h3 class="h3-text">Изменение поста {{ editedPost.id }}</h3>
                      <div class="x-title">
                        <u-input class="u-input" placeholder="Название" type="text" v-model="editedPost.title"></u-input>
                      </div>
                      <div class="x-tags">
                        <u-select :text="'Измените тэг'" :options="allTags" v-model="editedPost.tags"></u-select>
                      </div>
                      <div class="x-author">
                        <u-select :text="'Измение автора'" :options="allAuthors" v-model="editedPost.author"></u-select>
                      </div>
                      <div class="x-is-made">
                        <u-input type="checkbox" v-model="editedPost.is_made"></u-input>
                      </div>
                      <u-button class="create-btn" type="submit">Изменить</u-button>
                    </form>
                  </u-popup>
                </transition>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </transition-group>

    <!-- Если posts пуст -->
    <transition name="slide-fade">
      <div v-show="posts.length == 0">
        <div class="empty">
          <h2>Пока никаких задач :(</h2>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "TaskItem",
  props: {
    posts: {
      type: Array,
    }
  },
  data() {
    return {
      isPopupVisible: false,
      editedPost: {}, // Состояние изменение поста
      activeItemId: null,
    }
  },
  computed: {
    ...mapGetters(['allTags', 'allAuthors']),
  },
  methods: {
    ...mapActions(['editPostById',]),
    // Открытие закрытие модального окна
    showPopup(post) {
      this.isPopupVisible = !this.isPopupVisible;
      this.editedPost = { ...post }
      this.editedPost.tags = this.editedPost.tags.join('')
      this.activeItemId = post.id;
    },
    // Изменение поста
    editPost() {
      this.editedPost.tags = [this.editedPost.tags]

      this.editPostById({
        id: this.editedPost.id,
        title: this.editedPost.title,
        tags: this.editedPost.tags,
        author: this.editedPost.author,
        is_made: this.editedPost.is_made
      })

      this.isPopupVisible = false;
    },
    // Изменение при нажатии на checkbox
    updateCheckbox(post, event) {
      post.is_made = event.target.checked;

      this.editPostById({
        id: post.id,
        title: post.title,
        tags: post.tags,
        author: post.author,
        is_made: post.is_made,
      })
    },
    // Форматирование даты в привычный вид
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
}
</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-move {
  transition: transform 1s;
}

.x-title,
.x-tags,
.x-author,
.x-is-made {
  margin: 10px;
  margin-bottom: 15px;

}


tr {
  width: -webkit-fill-available;
}

.empty {
  color: orangered;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
}

.options-block {
  display: flex;
  align-items: center;
}

.tags-date-wrapper,
.author-options-wrapper {
  display: flex;
  align-items: center;
}

.separator {
  border-left: 1px solid #00000057;
  height: 20px;
  margin-right: 20px;
}

.task-item {
  background-color: #fff;
  margin: 15px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: .5s;
}

.task-item.is-made {
  box-shadow: 0px 2px 4px rgba(0, 255, 13, 0.61);
  transition: .5s;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  word-wrap: break-word;
}

@media (max-width: 600px) {
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.tags {
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
  margin-right: 15px;
}

.date {
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
  margin-right: 15px;
}

.author {
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
  margin-right: 15px;
}

.options {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

@media (max-width: 560px) {
  .options {
    flex-direction: column;
  }
}

.edit {
  cursor: pointer;
  margin-right: 10px;
  color: black;
  transition: .3s;
}

.edit:hover {
  color: rgb(247, 160, 0);
  transition: .3s;
  transform: scale(1.3);
}

.trash {
  cursor: pointer;
  color: black;
  transition: .3s;
}

.trash:hover {
  color: red;
  transition: .3s;
  transform: scale(1.3);
}

.is-made-checkbox {
  display: flex;
  align-items: center;
  margin-right: 10px;
  transition: .3s;

}

.is-made-checkbox:hover {
  transform: scale(1.3);
  transition: .3s;
}

.is-made-checkbox input[type="checkbox"] {
  margin-right: 5px;
  background-color: green;
}

@media (max-width: 460px) {
  .options {
    display: flex;
    flex-direction: column-reverse;

  }

  .task-item {
    align-items: center;
  }

  .title {
    margin-bottom: 15px;
  }

  .separator {
    display: none;
  }

  .author-options-wrapper,
  .tags-date-wrapper {
    width: inherit;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

@media (max-width: 460px) {

  .author-options-wrapper,
  .tags-date-wrapper {
    flex-direction: column;
  }
}



@media (max-width: 600px) {
  .task-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .options {
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    width: -webkit-fill-available;
    margin-top: 10px;
  }
}
</style>