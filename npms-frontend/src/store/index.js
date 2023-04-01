import {createStore} from 'vuex'

export default createStore({
    state: {
        token: ''
    },
    mutations: {
        // storage token
        setToken(state, token) {
            state.token = token;
            localStorage.token = token;
        },
        // clear token
        delToken(state) {
            state.token = '';
            localStorage.removeItem('token');
        }
    },
    getters: {
        // Obtain token method
        getToken(state) {
            if (!state.token) {
                state.token = localStorage.getItem('token');
            }
            return state.token;
        }
    },
    actions: {},
    modules: {}
});
