<template>
    <div class="wrapper">
        <div class="main-content">
            <Header />
            <Task />
        </div>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import Task from '../components/Task.vue';

export default {
    components: {
        Header,
        Task,
    }
}
</script>

<style scoped>
.main-content{
    margin: 0 auto;
    max-width: 1100px;
}
.wrapper {
    background-color: rgb(247, 247, 247);
    height: 100vh;
}
</style>