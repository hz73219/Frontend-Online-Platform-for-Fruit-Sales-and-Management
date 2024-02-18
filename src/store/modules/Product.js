import axios from 'axios';
export default {
    namespaced: true,
    state: {
        listData: [],
        listNewProduct: [],
    },
    getters: {
        getListData: state => state.listData,
    },
    mutations: {
        SET(state, listData) {
            state.listData = listData;
        },
        CREATE(state, objData) {
            state.listData.push(objData)
        },
        UPDATE(state, objData) {
            const index = state.listData.findIndex(p => p.id === objData.id);
            state.listData[index] = objData;
        },
        DELETE(state, id) {
            state.listData = state.listData.filter(item => item.id !== id);
        },
    },
    actions: {
        async fetchListData({ commit }) {
            axios
                .get('https://localhost:7202/api/Product/Getall')
                .then(response => {
                    commit('SET', response.data);
                })
                .catch(error => {
                    console.error('Error fetching:', error);
                });
        },
        async createObj({ commit }, obj) {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
            if (token) {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                };
                var result = await
                        axios
                        .post('https://localhost:7202/api/Product/Create', obj, config)
                        .then(response => {
                            commit('CREATE', response.data);
                            return true;
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            return false;
                        });
                return result;
            } else {
                console.error('Token not found.');
                return false;
            }
        },
        async updateObj(context, obj) {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
            if (token) {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                };
                console.log(obj)
                var result = await
                        axios
                        .put('https://localhost:7202/api/Product/Update', obj, config)
                        .then(response => {
                            console.log(response.data);
                            context.dispatch('fetchListData');
                            return true;
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            return false;
                        });
                return result;
            } else {
                console.error('Token not found.');
                return false;
            }
        },
        async deleteObj({ commit }, obj) {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
            if (token) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': `Bearer ${token}`
                    }
                };
                var resut = await
                        axios
                        .delete('https://localhost:7202/api/Product/Delete?id=' + obj.id, config)
                        .then(response => {
                            commit('DELETE', obj.id);
                            console.log(response.data + "xoa thanh cong");
                            return true;
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            return false;
                        });
                return resut;

            } else {
                console.error('Token not found.');
                return false;
            }
        },

    },
}
