import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      sysMenuList: [],
      userMenuList: [],
      status: false,
    },
    keepAliveList: [],
  },
  mutations: {
    GET_SYSMENULIST: (state, menuList) => {
      state.sidebar.sysMenuList = menuList
    },
    GET_USERMENULIST: (state, menuList) => {
      state.sidebar.userMenuList = menuList
    },
    CHANFE_STATUS: (state, status) => {
      state.sidebar.status = status
    },
    ADD_ALIVE: (state, list) => {
      if(JSON.stringify(state.keepAliveList).indexOf(JSON.stringify(list)) === -1){
        state.keepAliveList.push(list);
      }
    },
    REMOVE_ALIVE: (state, list) => {
      state.keepAliveList.forEach((value , index , array) =>{ 
        if(value===list){
          array.splice(index,1)
        }
      })
    }
  },
  actions: {
    Get_sysmenulist: ({ commit }, menuList) => {
      commit('GET_SYSMENULIST', menuList)
    },
    Get_usermenulist: ({ commit }, menuList) => {
      commit('GET_USERMENULIST', menuList)
    },
    Change_status({ commit } ,status) {
      commit('CHANFE_STATUS',status)
    },
    Add_list({ commit }, list) {
      commit('ADD_ALIVE', list)
    },
    Remove_alive({ commit }, list) {
      commit('REMOVE_ALIVE', list)
    },

  }
}

export default app
