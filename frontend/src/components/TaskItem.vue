<template>
  <div class="task-item-container">
    <!-- Если в posts что-то есть -->
    <div v-if="posts.length > 0">
      <!-- Вывод постов таблицей -->
      <table class="task-item" v-for="post in posts" :key="post.id">
        <tr>
          <td class="title">{{ post.title }}</td>
          <td class="options">
            <div class="tags-date-wrapper">
              <div class="tags">{{ post.tags }}</div>
              <div class="separator"></div>
              <div class="date">{{ post.date }}</div>
              <div class="separator"></div>
            </div>
            <div class="author-options-wrapper">
              <div class="author">{{ post.authors }}</div>
              <div class="separator"></div>
              <div class="options-block">
                <div class="is-made">
                  <u-input type="checkbox" v-model="post.is_made" />
                </div>
                <!-- Изменение поста (Пока не работает) -->
                <div class="edit">
                  <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
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
                <div class="trash" @click="$emit('remove', post)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash"
                    viewBox="0 0 16 16">
                    <path
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                  </svg>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <!-- Если posts пуст -->
    <div v-else>
      <div class="empty">
        <h2>Пока никаких задач :(</h2>
      </div>
    </div>
  </div>
</template>

<script>
import UPopup from './UI/UPopup.vue'
export default {
  components: { UPopup },
  name: "TaskItem",
  props: {
    posts: {
      type: Array,
    }
  },
  data() {
    return {
      isChecked: false,
    }
  }
}
</script>

<style scoped>
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
}

.trash {
  cursor: pointer;
}

.is-made {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.is-made input[type="checkbox"] {
  margin-right: 5px;
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