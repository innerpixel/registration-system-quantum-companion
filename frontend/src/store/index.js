import { createStore } from 'vuex';
import axios from 'axios';

const auth = {
  namespaced: true,
  state: {
    isLoggedIn: false,
    user: null,
    token: null
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.isLoggedIn = value;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/auth/login', credentials);
        const { token, user } = response.data;
        
        commit('SET_TOKEN', token);
        commit('SET_USER', user);
        commit('SET_LOGGED_IN', true);
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return response;
      } catch (error) {
        throw error;
      }
    },
    
    async logout({ commit }) {
      commit('SET_TOKEN', null);
      commit('SET_USER', null);
      commit('SET_LOGGED_IN', false);
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    
    async checkAuth({ commit }) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        commit('SET_TOKEN', token);
        commit('SET_USER', JSON.parse(user));
        commit('SET_LOGGED_IN', true);
      }
    }
  }
};

export default createStore({
  modules: {
    auth
  }
});
