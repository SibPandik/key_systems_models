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
import { mapActions, mapGetters } from 'vuex'
import InputForm from './InputForm.vue'
import RandomJoke from './RandomJoke.vue'
import TaskItem from './TaskItem.vue'

export default {
    name: "Task",
    components: { TaskItem, InputForm, RandomJoke, },
    data() {
        return {
            selectedTypeOfSort: "", // Выбранный тип сортировки
            // Массив объектов значений и названий сортировки
            sortTextData: [
                { name: "id", value: "По №" },
                { name: "title", value: "По названию" },
                { name: "author", value: "По автору" },
                { name: "tags", value: "По тэгам" },
                { name: "date", value: "По дате" },
                { name: "is_made", value: "По выполнености" },
            ],
        }
    },
    created() {
        this.getAllPosts()
    },
    computed: {
        ...mapGetters(['allPosts']),
        // Сортировка
        sortedPosts() {
            return [...this.allPosts].sort((post1, post2) => {
                const value1 = post1[this.selectedTypeOfSort];
                const value2 = post2[this.selectedTypeOfSort];

                // Проверяем, являются ли value1 и value2 массивами для tags
                if (Array.isArray(value1) && Array.isArray(value2)) {
                    const tag1 = value1[0] || '';
                    const tag2 = value2[0] || '';
                    return tag1.localeCompare(tag2);
                } else if (typeof value1 === 'string' && typeof value2 === 'string') {
                    // Сортировка по строковым значениям
                    return value1.localeCompare(value2);
                } else if (typeof value1 === 'boolean' && typeof value2 === 'boolean') {
                    // Сортировка по значениям boolean (is_made)
                    return value1 === value2 ? 0 : (value1 ? -1 : 1);
                } else {
                    return 0;
                }
            });
        }
    },
    methods: {
        ...mapActions(['getAllPosts', 'deletePostById']),
        // Добавление поста
        addTask(post) {
            this.posts.push(post)
        },
        // Удаление поста
        removePost(id) {
            this.$store.dispatch('deletePostById', { id });
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