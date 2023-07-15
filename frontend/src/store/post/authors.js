import $ajax from '../../axios/index'

export default {
    state: {
        authors: [],
        error: '',
        success: '',
    },
    getters: {
        // Получение всех авторов
        allAuthors(state) {
            return state.authors
        },
        // Получение сообщения об ошибке
        errorAuthorMessage(state) {
            return state.error
        },
        // Получение сообщения об успехе
        successAuthorMessage(state) {
            return state.success
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
        },
        // Добавление сообщения об ошибке
        setAuthorErrorMessage(state, payload) {
            state.error = payload
        },
        // Удаление автора из state
        deleteAuthor(state, payload) {
            state.authors = state.authors.filter(elem => elem.id !== payload)
        },
        // Добавление сообщения об успешной операци
        setAuthorSuccessMessage(state, payload) {
            state.success = payload
        }
    },
    actions: {
        // Получение всех авторов
        async getAllAuthors({ commit }) {
            try {
                const response = await $ajax.get('/api/authors')
                const authors = await response.data
                commit('setAuthors', authors)
            } catch (error) {
                console.log(error)
                commit('setAuthorErrorMessage', 'Ошибка при получении авторов')
                setTimeout(() => {
                    commit('setAuthorErrorMessage', '')
                }, 1500)
            }
        },
        // Добавление нового автора
        async addNewAuthor({ commit }, { id, name }) {
            try {
                const response = await $ajax.post('/api/authors/', { id, name })
                const newTagName = response.data
                commit('addAuthor', newTagName)
            } catch (error) {
                console.log(error)
                commit('setAuthorErrorMessage', 'Ошибка при добавлении автора')
                setTimeout(() => {
                    commit('setAuthorErrorMessage', '')
                }, 1500)
            }
        },
        // Удаление автора
        async deleteAuthorById({ commit }, { id }) {
            try {
                await $ajax.delete(`/api/authors/${id}`)
                id = Number(id)
                commit('deleteAuthor', id)
                commit('setAuthorSuccessMessage', 'Автор успешно удален')
                setTimeout(() => {
                    commit('setAuthorSuccessMessage', '')
                }, 1500)
            } catch (error) {
                console.log(error)
                commit('setAuthorErrorMessage', 'Ошибка при удалении автора')
                setTimeout(() => {
                    commit('setAuthorErrorMessage', '')
                }, 1500)
            }
        },
    }
}