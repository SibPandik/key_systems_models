<template>
  <div class="input-form">
    <!-- Popup -->
    <u-popup v-if="isPopupVisible" @closePopup="showPopup">
      <!-- Form -->
      <form class="form" @submit.prevent="handleSubmit">
        <!-- Title -->
        <div class="v-title">
          <u-input class="u-input" placeholder="Название" type="text" v-model="postData.title" />
        </div>
        <!-- Select tags -->
        <div class="v-option">
          <u-select v-model="selectedTag" :options="tags" :text='"Выберите тэг"'></u-select>
          <div v-if="!isAddTagVisible" class="add" @click="toggleAddTag">
            <div class="add-author">+</div>
          </div>
          <div v-else class="add">
            <div class="add-author-cross" @click="toggleAddTag">&times;</div>
            <u-input class="u-input-add" type="text" v-model="newTag" />
            <u-button class="create-btn" type="submit" @click="addTag">Добавить</u-button>
          </div>
        </div>
        <!-- Select Author -->
        <div class="v-option">
          <u-select v-model="selectedAuthor" :options="authors" :text='"Выберите автора"'></u-select>
          <div v-if="!isAddAuthorVisible" class="add" @click="toggleAddAuthor">
            <div class="add-author">+</div>
          </div>
          <div v-else class="add">
            <div class="add-author-cross" @click="toggleAddAuthor">&times;</div>
            <u-input class="u-input-add" type="text" v-model="newAuthor" />
            <u-button class="create-btn" type="submit" @click="addAuthor">Добавить</u-button>
          </div>
        </div>
        <!-- Is made checkbox -->
        <div class="v-checkbox">
          <label class="is-made">Сделано ли задание:</label>
          <u-input type="checkbox" v-model="isChecked" />
        </div>
        <div class="wrapper-btn">
          <u-button class="create-btn" type="submit" @click="addTask">Создать</u-button>
        </div>
      </form>
    </u-popup>

    <u-button class="create-btn" @click="showPopup">Создать задачу</u-button>
  </div>
</template>

<script>
export default {
  name: "InputForm",
  data() {
    return {
      isPopupVisible: false,      // Состояние видимости модального окна
      isAddTagVisible: false,     // Состояние видимости формы для ввода тэга
      isAddAuthorVisible: false,  // Состояние видимости формы для ввода автора
      isChecked: false,           // Состояние чекбокса

      //Массив объектов с тэгами
      tags: [
        { id: 1, value: "KSB", name: "KSB" },
        { id: 2, value: "Home", name: "Home" },
        { id: 3, value: "Other", name: "Other" },
      ],

      //Массив объектов с авторами
      authors: [
        { id: 1, value: "Кирилл", name: "Кирилл" },
        { id: 2, value: "Никита", name: "Никита" },
        { id: 3, value: "Саня", name: "Саня" },
      ],

      newTag: "",         // Состояние из инпута с вводом тэга
      selectedTag: "",    // Значение выбраного тэга
      newAuthor: "",      // Состояние из инпута с вводом автора
      selectedAuthor: "", // Значение выбранного автора
      
      // Обьект поста
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
      this.isPopupVisible = !this.isPopupVisible;
    },
    closePopup() {
      this.isPopupVisible = !this.isPopupVisible;
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
        this.tags.push({
          id: this.tags.length,
          value: this.newTag.trim(),
          name: this.newTag.trim()
        });
      }
      this.newTag = "";
      this.toggleAddTag() // Закрываем форму после добавления 
    },

    // Добавление автора
    addAuthor() {
      if (this.newAuthor.trim() !== "") {
        this.authors.push({
          id: this.authors.length,
          value: this.newAuthor.trim(),
          name: this.newAuthor.trim()
        });
      }
      this.newAuthor = "";
      this.toggleAddAuthor() // Закрываем форму после добавления
    },

    addTask() {
      const date = new Date();                        // Создание объекта Date с текущей датой и временем
      this.postData.id = Date.now()                   // Берем id из текущего времени в миллисекундах
      this.postData.date = date.toLocaleDateString(); // Преобразование даты в строку с форматом даты

      this.postData.tags = this.selectedTag;          // Передаем в postData.tags выбранный нами тэг в u-select
      this.postData.authors = this.selectedAuthor;    // Передаем в postData.authors выбранного тами автора в u-select

      this.$emit('create', { ...this.postData });     // Пушим новое задание

      // Очищаем все переменные
      this.postData.tags = "";
      this.postData.title = "";
      this.postData.authors = "";
      this.postData.is_made = false;
      this.isPopupVisible = false;
      this.selectedAuthor = "";
      this.selectedTag = "";

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
  display: flex;
}

.v-checkbox {
  margin-bottom: 20px;
}

.title,
.tags,
.is-made {
  margin-right: 15px;
}

.is-made {
  margin-top: 2px;
}

.v-option {
  display: flex;
}

.add {
  display: flex;
  align-items: center;
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

@media (max-width: 560px) {
  .input-form {
    margin: 10px
  }
}

@media (max-width: 460px) {
  .input-form {
    margin: 0 0 13px 0;
    height: 48px;
  }
}

</style>