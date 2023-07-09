<template>
  <div class="input-form">
    <!-- Popup -->
    <popup v-if="isPopupVisible" @closePopup="closePopup">
      <!-- Form -->
      <form class="form" @submit.prevent="handleSubmit">
        <!-- Title -->
        <div class="v-title">
          <label class="title">Название:</label>
          <input class="v-input" type="text" v-model="postData.title" />
        </div>
        <!-- Select tags -->
        <div class="v-option">
          <label class="tags">Теги:</label>
          <select id="tags" v-model="postData.tags">
            <option v-for="tag in tags" :key="tag.id" :value="tag.name">{{ tag.name }}</option>
          </select>
          <div v-if="!isAddTagVisible" class="add" @click="toggleAddTag">
            <div class="add-author">+</div>
          </div>
          <div v-else class="add">
            <div class="add-author-cross" @click="toggleAddTag">&times;</div>
            <input class="v-input-add" type="text" v-model="newTag" />
            <button class="create-btn" type="submit" @click="addTag">Добавить</button>
          </div>
        </div>
        <!-- Select Author -->
        <div class="v-option">
          <label class="tags">Автор:</label>
          <select id="author" v-model="postData.authors">
            <option v-for="author in authors" :key="author.id" :value="author.name">{{ author.name }}</option>
          </select>
          <div v-if="!isAddAuthorVisible" class="add" @click="toggleAddAuthor">
            <div class="add-author">+</div>
          </div>
          <div v-else class="add">
            <div class="add-author-cross" @click="toggleAddAuthor">&times;</div>
            <input class="v-input-add" type="text" v-model="newAuthor" />
            <button class="create-btn" type="submit" @click="addAuthor">Добавить</button>
          </div>
        </div>
        <!-- Is made checkbox -->
        <div class="v-checkbox">
          <label class="is-made">Сделано ли задание:</label>
          <input type="checkbox" id="isMade" v-model="postData.is_made" />
        </div>
        <div class="wrapper-btn">
          <button class="create-btn" type="submit" @click="addTask">Создать</button>
        </div>
      </form>
    </popup>

    <button class="create-btn" @click="showPopup">Создать задачу</button>
  </div>
</template>

<script>
import Popup from './Popup.vue';


export default {
  name: "InputForm",
  components: { Popup },
  data() {
    return {
      isPopupVisible: false,
      isAddTagVisible: false,
      isAddAuthorVisible: false,
      tags: [
        { id: 0, name: "" },
        { id: 1, name: "KSB" },
        { id: 2, name: "Home" },
        { id: 3, name: "Other" },
      ],
      authors: [
        { id: 1, name: "Кирилл" },
        { id: 2, name: "Никита" },
        { id: 3, name: "Саня" },
      ],
      postData: {
        id: Date.now(),
        title: "",
        tags: "",
        date: "",
        authors: "",
        is_made: false,
      },
    };
  },
  methods: {
    // Открыть/закрыть модальное окно
    showPopup() {
      this.isPopupVisible = true;
    },
    closePopup() {
      this.isPopupVisible = false;
    },

    // Скрыть/показать форму для добавление тэга и автора
    toggleAddTag() {
      this.isAddTagVisible = !this.isAddTagVisible;
      this.newTag = "";
    },
    toggleAddAuthor() {
      this.isAddAuthorVisible = !this.isAddAuthorVisible;
      this.newAuthor = "";
    },

    // Добавление тэга
    addTag() {
      if (this.newTag.trim() !== "") {
        this.tags.push({ id: this.tags.length, name: this.newTag.trim() });
      }
      this.newTag = "";
    },

    // Добавление автора
    addAuthor() {
      if (this.newAuthor.trim() !== "") {
        this.authors.push({ id: this.authors.length, name: this.newAuthor.trim() });
      }
      this.newAuthor = "";
    },
    addTask() {
      const date = new Date();                        // Создание объекта Date с текущей датой и временем
      this.postData.date = date.toLocaleDateString(); // Преобразование даты в строку с форматом даты
      this.$emit('create', { ...this.postData });
      this.postData.title = "";
      this.postData.tags = "";
      this.postData.authors = "";
      this.postData.is_made = false;
      this.isPopupVisible = false;
    }
  },
};
</script>

<style scoped>
.v-title,
.v-option,
.v-checkbox {
  margin: 10px
}

.v-checkbox {
  margin-bottom: 20px;
}

.title,
.tags,
.is-made {
  margin-right: 15px;
}

.v-option {
  display: flex;  
}

.add {
  display: flex;
  align-items: center;
}

.v-input-add {
  width: 100px;
  margin-right: 20px;
}

.add-author,
.add-tag,
.add-author-cross {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 25px;
  cursor: pointer;
  color: green;
}

.add-author-cross {
  color: red;
}

select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

input[type="text"] {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

input[type="text"]:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.form {
  font-size: 20px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 560px) {

  .v-title,
  .v-option {
    display: flex;
    flex-direction: column;
  }  

  .add {
    margin-top: 10px;
  }
}


.input-form {
  display: flex;
  justify-content: space-evenly;
  margin: 20px;
  margin-bottom: 25px;
}

.wrapper-btn {
  margin-top: 25px;
  width: 100%;
  display: contents;
  margin-top: 20px;
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
  .create-btn{
    font-size: 12px;
  }
}

</style>