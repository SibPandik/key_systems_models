<template>
    <div class="task">
        <random-joke></random-joke>
        <div class="up-block">
            <u-select :text='"Выберите сортировку"' :options="sortTextData" v-model="selectedTypeOfSort"></u-select>
            <input-form @create="addTask" />
        </div>
        <task-item :posts="sortedPosts" @remove="removePost" />
    </div>
</template>

<script>
import InputForm from './InputForm.vue'
import RandomJoke from './RandomJoke.vue'
import TaskItem from './TaskItem.vue'

export default {
    name: "Task",
    components: { TaskItem, InputForm, RandomJoke, },
    data() {
        return {
            selectedTypeOfSort: "", // Выбранный тип сортировки
            // Массив объектов с постами
            posts: [
                { id: 1, title: "Сделать Vue приложение", tags: "KSB", date: "10.07.2023", authors: "Kirill", is_made: true },
                { id: 2, title: "Купить молока", tags: "Market", date: "09.07.2022", authors: "Александр", is_made: false },
                { id: 3, title: "Найти анекдот", tags: "Утенок", date: "09.07.2023", authors: "Николай", is_made: false },
            ],
            // Массив объектов значений и названий сортировки
            sortTextData: [
                { value: "title", name: "По названию" },
                { value: "tags", name: "По тэгам" },
                { value: "date", name: "По дате" },
                { value: "authors", name: "По автору" },
            ],
        }
    },
    computed: {
        // Сортировка
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => post1[this.selectedTypeOfSort]?.localeCompare(post2[this.selectedTypeOfSort]))
        }
    },
    methods: {
        // Добавление поста
        addTask(post) {
            this.posts.push(post)
        },
        // Удаление поста
        removePost(post) {
            this.posts = this.posts.filter(elem => elem.id !== post.id)
        },
    }
}
</script>

<style scoped>
.task {
    padding-bottom: 20px;
}

.up-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px 0 25px;
}

@media (max-width: 460px) {
    .up-block {
        display: flex;
        flex-direction: column-reverse;
        align-items: stretch;

    }
}
</style>