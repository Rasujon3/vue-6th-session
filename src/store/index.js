import { createStore } from 'vuex'
import postModule from './postModule'
import axios from 'axios'

const store = createStore({
  state: {
    authToken: null,
    authUserInfo: null
  },
  getters: {
    getAuthToken(state) {
      state.authToken = JSON.parse(localStorage.getItem('authToken'))
      return state.authToken
    },
    getAuthUserInfo(state) {
      state.authUserInfo = JSON.parse(localStorage.getItem('authUserInfo'))
      return state.authUserInfo
    }
  },
  mutations: {
    logout(state) {
      state.authToken = null
      state.authUserInfo = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUserInfo')
    },
    setAuthToken(state, payload) {
      state.authToken = payload
      localStorage.setItem('authToken', JSON.stringify(payload))
    },
    setAuthUserInfo(state, payload) {
      state.authUserInfo = payload
      localStorage.setItem('authUserInfo', JSON.stringify(payload))
    }
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const response = await axios.post('https://dummyjson.com/user/login', {
          username: payload.userName,
          password: payload.password
        })
        const authToken = {
          token: response.data.token,
          refreshToken: response.data.refreshToken
        }
        const authUserInfo = {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          gender: response.data.gender,
          image: response.data.image
        }
        commit('setAuthToken', authToken)
        commit('setAuthUserInfo', authUserInfo)
        return response.data
      } catch (error) {
        alert(error.response.data.message)
        throw error
      }
    },
    logout({ commit }) {
      commit('logout')
    }
  },
  modules: {
    posts: postModule
  }
})

export default store
