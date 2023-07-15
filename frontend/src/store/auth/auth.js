import axios from 'axios'
import router from '@/router'

export default {
    state: {
        token: "",
        error: "",
    },
    getters: {
        isLoggedIn(state) {
            return state.token
        },
        errorMessage(state) {
            return state.error
        }
    },
    mutations: {
        // Устанавливаем токен в state и localStorage
        setToken(state, payload) {
            if (localStorage.getItem('token')) {
                state.token = payload
            } else {
                state.token = payload
                localStorage.setItem('token', payload)
            }
        },
        // Удаляем токен из state и localStorage
        deleteToken(state) {
            state.token = ''
            localStorage.removeItem('token')
            router.push('/login')
        },
        setAuthErrorMessage(state, payload) {
            state.error = payload
        }
    },
    actions: {
        // Получение токена
        async getToken({ commit }, { username, password }) {
            try {
                const response = await axios.post('http://pandikk.pythonanywhere.com/api-auth-token/', { username, password }, {})
                await commit('setToken', response.data.token)
                router.push('/')
            } catch (error) {
                console.log(error)
                commit('setAuthErrorMessage', 'Неверный логин или пароль')
                setTimeout(() => {
                    commit('setAuthErrorMessage', '')
                }, 3000)
            }
        }
    }
}