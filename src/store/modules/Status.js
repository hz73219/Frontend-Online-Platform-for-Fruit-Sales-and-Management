export default {
    namespaced: true,
    state: {
        message: "",
        link: ""
    },
    getters: {
        getMessage: state => state.message,
        getLink: state => state.link
    },
    mutations: {
        setMessage(state, message) {
            state.message = message;
        },
        setLink(state, link) {
            state.link = link;
        }
    },
    actions: {
        createMessage({ commit }, message) {
            commit('setMessage', message);
        },
        deleteMessage({ commit }) {
            commit('setMessage', "");
        },
        createLink({ commit }, link) {
            commit('setLink', link);
        },
        deleteLink({ commit }) {
            commit('setLink', "");
        },
    },
}
