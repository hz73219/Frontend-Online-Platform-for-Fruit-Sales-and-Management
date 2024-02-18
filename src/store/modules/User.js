import axios from 'axios';
import Cookies from 'js-cookie';
export default {
  namespaced: true,
  state: {
    users: [],
    user: null,
    id: null,
  },
  getters: {
    getListData: state => state.users,
    getUser: state => state.user,
  },
  mutations: {
    setListUser(state, users) {
      state.users = users;
    },
    setUser(state,user)
    {
        state.user = user;
    },
    deleteUser(state,id)
    {
      var newArr = state.products.filter(x=>x.id != id);
      state.products = newArr;
    }
  },
  actions: {
    async createUser(context,obj) {
        var result = await axios
        .post('https://localhost:7202/api/Login/Register', obj, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log(response.data);
          return true;
        })
        .catch(error => {
          console.error('Error:', error);
          return false;
        });   
        return result;
    },
    async fetchData({ commit }) {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1") || '';
      if(token!="")
      {
          const config = {
              headers: {
                  'Content-Type': 'application/json; charset=utf-8',
                  'Authorization': `Bearer ${token}`
              }
          };
          axios
              .get('https://localhost:7202/api/User/Get',config)
              .then(response => {
                  console.log(response.data)
                  commit('setUser', response.data);
              })
              .catch(error => {
                  console.error('Error fetching:', error);
              });
      }
      else
      {
          console.error('Token not found.');
          return "NoToken";
      }
    
  },
  async fetchListData({ commit }) {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1") || '';
    if(token!="")
    {
        const config = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            }
        };
        axios
            .get('https://localhost:7202/api/User/GetAll',config)
            .then(response => {
                console.log(response.data)
                commit('setListUser', response.data);
            })
            .catch(error => {
                console.error('Error fetching:', error);
            });
    }
    else
    {
        console.error('Token not found.');
        return "NoToken";
    }
  
},
  async updateUser(context, obj) {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
    if (token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        console.log(obj)
        var result = await
                axios
                .put('https://localhost:7202/api/User/Update', obj, config)
                .then(response => {
                    console.log(response.data);
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
    async loginUser(context,obj)
    {
      var result = await axios
      .post('https://localhost:7202/api/Login/Login', obj, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('login');       
        console.log(response.data);       
        Cookies.set('token', response.data);
        return true;
      })
      .catch(error => {
        console.error('Error:', error);
        return false;
      });   
      return result;

    }
  },
}
