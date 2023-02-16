import { createStore } from 'vuex'
import axios from 'axios'
const store = createStore({
  state: {
    page: 1,
    perPage: 5,
    numbers: [],
    url: 'https://63e4e2d98e1ed4ccf6e859a0.mockapi.io/api/numbers/',
  },
  actions: {
    ADD_NUMBER: async (ctx, payload) => {
      let newNum = {
        number: payload.number,
        timeStamp: payload.timeStamp
      }
      await axios({
        method: 'post',
        url: store.state.url,
        data: newNum
      })
        .then(response => {
          ctx.dispatch('SET_NUMBERS', {
            page: store.getters.GET_PAGE,
            limit: 5,
            sort: 'desc'
          })
          alert(response.statusText)
        })
        .catch(err => console.log(err))
    },
    SET_NUMBERS: async (ctx, payload) => {
      const url = new URL(store.state.url)
      url.searchParams.append('page', payload.page)
      url.searchParams.append('limit', payload.limit);
      url.searchParams.append('order', payload.sort);
      await axios({
        method: 'get',
        url: url,
      })
        .then((response) => {
          ctx.commit('SAVE_NUMBERS', response.data)
          if (response.data.status == 200) alert(response.status.text)
        })
        .catch((err) => console.log(err));
    },
    UPDATE_NUMBER: async (ctx, updateInfo) => {
      await axios({
        method: 'put',
        url: store.state.url + updateInfo.id,
        data: {
          id: updateInfo.id,
          number: updateInfo.number
        }
      })
        .then((response) => {
          if (response.status === 200) {
            ctx.dispatch("SET_NUMBERS", {
              page: store.getters.GET_PAGE,
              limit: 5,
              sort: 'desc'
            })
            alert(response.statusText);
          } else {
            alert(response.statusText);
          }
        });
    },
    DELETE_NUMBER: async (ctx, id) => {
      await axios({
        method: 'delete',
        url: store.state.url + id,
      })
        .then((response) => {
          if (response.status === 200) {
            alert(response.statusText)
            ctx.dispatch("SET_NUMBERS", {
              page: store.getters.GET_PAGE,
              limit: 5,
              sort: 'desc'
            })
          } else {
            alert(response.statusText);
          }
        })
        .catch((err) => console.log(err));
    },
    SEARCH_NUMBER: async (ctx, searchParam) => {
      const url = new URL(store.state.url)
      url.searchParams.append('number', searchParam);
      await axios({
        method: 'get',
        url: url,
      })
        .then((response) => {
          if (response.data.status == 200) alert(response.status.text)
          ctx.commit('SAVE_NUMBERS', response.data)
        })
        .catch((err) => console.log(err));
    },
    SORT_ASC: async (ctx, payload) => {
      const url = new URL(store.state.url)
      url.searchParams.append('sortBy', 'timeStamp')
      url.searchParams.append('order', payload.sort)
      url.searchParams.append('page', payload.page)
      url.searchParams.append('limit', payload.limit)
      await axios({
        method: 'get',
        url: url,
      })
        .then((response) => {
          if (response.data.status == 200) alert(response.status.text)
          ctx.commit('SAVE_NUMBERS', response.data)
        })
        .catch((err) => console.log(err));
    },
    SORT_DESC: async (ctx, payload) => {
      const url = new URL(store.state.url)
      url.searchParams.append('sortBy', 'timeStamp')
      url.searchParams.append('order', payload.sort)
      url.searchParams.append('page', payload.page)
      url.searchParams.append('limit', payload.limit)
      await axios({
        method: 'get',
        url: url,
      })
        .then((response) => {
          if (response.data.status == 200) alert(response.status.text)
          ctx.commit('SAVE_NUMBERS', response.data)
        })
        .catch((err) => console.log(err));
    },
    PAGE_UP: (ctx) => {
      ctx.commit("PAGE_UP")
    },
    PAGE_DOWN: (ctx) => {
      ctx.commit("PAGE_DOWN")
    },
    SET_PER_PAGE: (ctx, payload) => {
      ctx.commit("PER_PAGE", payload)
    }
  },
  mutations: {
    SAVE_NUMBERS(state, payload) {
      state.numbers = payload
    },
    PAGE_UP(state){
      state.page++
    },
    PAGE_DOWN(state){
      state.page--
    },
    PER_PAGE(state, payload){
      state.perPage = payload
    }
  },
  getters: {
    GET_NUMBERS(state) {
      return state.numbers
    },
    GET_PER_PAGE(state){
      return state.perPage
    },
    GET_PAGE(state){
      return state.page
    }
  }
})
export default store;