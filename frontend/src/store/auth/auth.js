import $ajax from '../../axios/index'
import router from '@/router'

export default {
    state: {
        token: ""
    },
    getters: {
        isLoggedIn(state) {
            return state.token
        }
    },
    mutations: {
        setToken(state, payload) {
            if (localStorage.getItem('token')) {
                state.token = payload
            } else {
                state.token = payload
                localStorage.setItem('token', payload)
            }
        },
        deleteToken(state) {
            state.token = ''
            localStorage.removeItem('token')
            router.push('/login')
        }
    },
    actions: {
        async getToken({ commit }, { username, password }) {
            const response = await $ajax.post('/api-auth-token/', { username, password })
            await commit('setToken', response.data.token)
            router.push('/')
        }
    }
}