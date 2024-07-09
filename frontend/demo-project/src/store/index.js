import { createStore } from 'vuex';
import { getUser, signinRedirect, signoutRedirect } from '../authService';

export default createStore({
    state: {
        user: null,
        accessToken:'',
        themeMode: 'light',
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setAccessToken(state, token) {
            state.accessToken = token;
        },
        setThemeMode(state, mode) {
            state.themeMode = mode;
            console.log(mode);
            localStorage.setItem('themeMode', mode);
          },
    },
    actions: {
        async loadUser({ commit }) {
            const user = await getUser();
            commit('setUser', user);
        },
        signin() {
            signinRedirect();
        },
        signout() {
            signoutRedirect();
        },
        saveAccessToken({ commit }, token) {
            commit('setAccessToken', token);
            localStorage.setItem('access_token', token);
        }
    },
    getters: {
        isAuthenticated: state => !!state.user,
        accessToken: state => state.accessToken
    }
});