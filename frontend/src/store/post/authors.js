import $ajax from '../../axios/index'

export default {
    state: {
        authors: []
    },
    getters: {
        // Получение всех авторов
        allAuthors(state) {
            return state.authors
        }
    },
    mutations: {
        // Полученный массив авторов пушим в state
        setAuthors(state, payload) {
            state.authors = payload
        },
        // Добавляем нового автора в state
        addAuthor(state, payload) {
            state.authors.push(payload)
        }
    },
    actions: {
        // Получение всех авторов
        async getAllAuthors({ commit }) {
            const response = await $ajax.get('/api/authors')
            const authors = await response.data
            commit('setAuthors', authors)
        },
        // Добавление нового автора
        async addNewAuthor({ commit }, { id, name }) {
            const response = await $ajax.post('/api/authors/', { id, name })
            const newTagName = response.data
            commit('addAuthor', newTagName)
        }
    }
}