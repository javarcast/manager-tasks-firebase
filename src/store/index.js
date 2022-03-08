import { createStore } from 'vuex'
import router from '../router'
export default createStore({
  state: {
    tasks: [],
    task: {
      id: '',
      name: '',
      categories: [],
      state: '',
      numberValue: 0,
    },
    user: null,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    LOAD(state, payload) {
      state.tasks = payload;
    },
    SET_TASKS_ADD(state, payload) {
      state.tasks.push(payload);
    },
    DELETE_A_TASK(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    SET_TASK(state,id){
      if(!state.tasks.find(item => item.id ===id)){
        router.push('/');
        return;
      }
      state.task = state.tasks.find(item => item.id ===id);
    },
    SET_UPDATE_TASKS(state, payload) {
      state.tasks = state.tasks.map(item => item.id === payload.id? payload : item);
    },
    SET_LOGOUT(state) {
      state.user=null;
    }

  },
  actions: {
    LOGOUT({commit}) {
      commit('SET_LOGOUT');


      localStorage.removeItem('user');
      router.push('/login');
    },
    async LOGIN_USER({commit}, user) {
      try {
        const resp = await fetch(`${process.env.VUE_APP_API_LOGIN_URL}${process.env.VUE_APP_API_KEY}`,{
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true
          }),
        });

        const userData = await resp.json();
        if(userData.error) {
          console.error(userData.error);
          return;
        }
        commit('SET_USER',userData);
        localStorage.setItem('user', JSON.stringify(userData));
        router.push('/');
        
      } catch (error) {
        console.error(error);
      }
    },
    async REGISTER_USER({commit}, user) {
      try {
        const resp = await fetch(`${process.env.VUE_APP_API_REGISTER_URL}${process.env.VUE_APP_API_KEY}`,{
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true,
          })
        });
        const dataDB = await resp.json();
        if(dataDB.error) {
          console.error(dataDB.error)
          return;
        }

        commit('SET_USER', dataDB);

        localStorage.setItem('user', JSON.stringify(userData));
        router.push('/');
        return;
      } catch (error) {
        console.error(error);
      }
    },
    async LOAD_LOCAL_STORAGE({commit, state}) {
      if(localStorage.getItem('user')) {
        commit('SET_USER', JSON.parse(localStorage.getItem('user')));
      } else {
        console.log('erh')
        return commit('SET_USER', null);
      }
      try {
        const resp = await  fetch(`${process.env.VUE_APP_API_URL}tasks/${state.user.localId}.json?auth=${state.user.idToken}`);
        const dataDB = await resp.json();
        const arrayTasks = [];
        for (const item in dataDB) {
          arrayTasks.push(dataDB[item]);
        }

        commit('LOAD', arrayTasks);
      } catch (error) {
        console.error(error)
      }
    },
    async ADD_TASKS({commit, state}, payload) {
      try {
        const resp = await fetch(`${process.env.VUE_APP_API_URL}tasks/${state.user.localId}/${payload.id}.json?auth=${state.user.idToken}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
        const dataDB = await resp.json();

      } catch (error) {
        console.error(error);
      }
      commit('SET_TASKS_ADD', payload);
    },
    async DELETE_TASK({commit, state}, id) {

      try {
        await fetch(`${process.env.VUE_APP_API_URL}tasks/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, { 
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        commit('DELETE_A_TASK', id);
      } catch (error) {
        console.error(error);
      }
    },
    UPDATE_TASK({commit}, id) {
      commit('SET_TASK', id);
    },
    async UPDATE_TASKS({commit,state}, payload) {
      try {
        const resp = await fetch(`${process.env.VUE_APP_API_URL}tasks/${state.user.localId}/${payload.id}.json?auth=${state.user.idToken}`, { 
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify(payload),
          
        });
        const dataDB = await resp.json();
        commit('SET_UPDATE_TASKS', dataDB);
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    isAuth: (state) => !!state.user,
  },
  modules: {
  }
})
