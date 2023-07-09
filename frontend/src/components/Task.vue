<template>
    <div class="task">
        <random-joke></random-joke>
        <InputForm @create="addTask"/>
        <TaskItem :posts="posts"/>
    </div>
</template>

<script>
import InputForm from './InputForm.vue'
import RandomJoke from './RandomJoke.vue'
import TaskItem from './TaskItem.vue'

export default {
    name: "Task",
    components:{ TaskItem, InputForm, RandomJoke, },
    data() {
        return {
            posts: [
                { id: 1, title: "Сделать Vue приложение", tags: "KSB", date: "Today", authors: "Kirill", is_made: true },
                { id: 2, title: "Купить молока", tags: "Market", date: "Today", authors: "Kirill", is_made: false },
                { id: 3, title: "Найти анекдот", tags: "Туалетный утенок", date: "09/07/2023", authors: "Степанов Николай", is_made: false },
            ]
        }
    }, 
    methods: {
        addTask(post) {
            this.posts.push(post)
        }
    }
}
</script>

<style scoped>
    .task {
        padding-bottom: 20px;
    }
</style>