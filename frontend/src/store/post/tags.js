import $ajax from '../../axios/index'

export default {
    state: {
        tags: []
    },
    getters: {
        // Получение всех тэгов
        allTags(state) {
            return state.tags
        }
    },
    mutations: {
        // Полученный массив тэгов пушим в state
        setTags(state, payload) {
            state.tags = payload
        },
        // Добавление нового тэга в state
        addTag(state, payload) {
            state.tags.push(payload)
        }
    },
    actions: {
        // Получение всех тэгов
        async getAllTags({ commit }) {
            const response = await $ajax.get('/api/tags')
            const tags = await response.data
            commit('setTags', tags)
        },
        // Добавление нового тэга
        async addNewTag({ commit }, { id, name }) {
            const response = await $ajax.post('/api/tags/', { id, name },)
            const newTagName = response.data
            commit('addTag', newTagName)
        }
    }
}