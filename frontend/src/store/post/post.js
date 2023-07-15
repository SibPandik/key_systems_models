import $ajax from '../../axios/index'

export default {
    state: {
        posts: []
    },
    getters: {
        // Получение всех постов из state
        allPosts(state) {
            return state.posts
        }
    },
    mutations: {
        // Полученный массив постов отдаем в state
        setPosts(state, payload) {
            state.posts = payload
        },
        // Добавление нового поста в state
        addPost(state, payload) {
            state.posts.push(payload)
        },
        // Обновление поста
        updatePost(state, editedPost) {
            const index = state.posts.findIndex(post => post.id === editedPost.id);
            if (index !== -1) {
                state.posts.splice(index, 1, editedPost);
            }
        },
        // Удаление поста из state
        deletePost(state, payload) {
            state.posts = state.posts.filter(elem => elem.id !== payload)
        }
    },
    actions: {
        // Получение всех постов
        async getAllPosts({ commit }) {
            try {
                const response = await $ajax.get('/api/todo')
                const posts = await response.data
                commit('setPosts', posts)
            } catch (error) {
                console.log(error)
            }
        },
        // Добавление новый пост
        async addNewPost({ commit }, { title, tags, author, is_made }) {
            try {
                const response = await $ajax.post('/api/todo/',
                    {
                        title,
                        tags,
                        author,
                        is_made

                    },)
                const post = response.data
                commit('addPost', post)
            } catch (error) {
                console.log(error)
            }
        },
        // Изменение поста
        async editPostById({ commit }, { id, title, tags, author, is_made }) {
            try {
                const response = await $ajax.put(`/api/todo/${id}/`,
                    {
                        title,
                        tags,
                        author,
                        is_made,

                    });
                const editedPost = response.data;
                commit('updatePost', editedPost);
            } catch (error) {
                console.log(error)
            }
        },
        // Удаление поста
        async deletePostById({ commit }, { id }) {
            try {
                await $ajax.delete(`/api/todo/${id}`)
                commit('deletePost', id)
            } catch (error) {
                console.log(error)
            }
        }
    }
}