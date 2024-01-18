import $ajax from '../../axios/index'

export default {
    state: {
        tags: [],
        error: '',
        success: ''
    },
    getters: {
        // Получение всех тэгов
        allTags(state) {
            return state.tags
        },
        // Получение сообщения об ошибке
        errorTagMessage(state) {
            return state.error
        },
        // Получение сообщения об успехе
        successTagMessage(state) {
            return state.success
        },
    },
    mutations: {
        // Полученный массив тэгов пушим в state
        setTags(state, payload) {
            state.tags = payload
        },
        // Добавление нового тэга в state
        addTag(state, payload) {
            state.tags.push(payload)
        },
        // Добавление сообщения об ошибке
        setTagErrorMessage(state, payload) {
            state.error = payload
        },
        // Удаление тэга из state
        deleteTag(state, payload) {
            state.tags = state.tags.filter(elem => elem.id !== payload)
        },
        // Добавление сообщения об успешной операции
        setTagSuccessMessage(state, payload) {
            state.success = payload
        },
    },
    actions: {
        // Получение всех тэгов
        async getAllTags({ commit }) {
            try {
                const response = await $ajax.get('/api/tags')
                const tags = await response.data
                commit('setTags', tags)
            } catch (error) {
                console.log(error)
                commit('setErrorMessage', 'Ошибка при получении тэгов')
                setTimeout(() => {
                    commit('setTagErrorMessage', '')
                }, 1500)
            }
        },
        // Добавление нового тэга
        async addNewTag({ commit }, { id, name }) {
            try {
                const response = await $ajax.post('/api/tags/', { id, name },)
                const newTagName = response.data
                commit('addTag', newTagName)
            } catch (error) {
                console.log(error)
                commit('setTagErrorMessage', 'Ошибка при добавлении отдела')
                setTimeout(() => {
                    commit('setTagErrorMessage', '')
                }, 1500)
            }
        },
        // Удаление тэга
        async deleteTagById({commit}, { id }) {
            try {
                await $ajax.delete(`/api/tags/${id}`)
                id = Number(id)
                commit('deleteTag', id)
                commit('setTagSuccessMessage', 'Тэг успешно удален')
                setTimeout(() => {
                    commit('setTagSuccessMessage', '')
                }, 1500)
            } catch (error) {
                console.log(error)
                commit('setTagErrorMessage', 'Ошибка при удалении тэга')
                setTimeout(() => {
                    commit('setTagErrorMessage', '')
                }, 1500)
            }
        }
    }
}