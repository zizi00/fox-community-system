import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const types = {
  SET_IS_AUTNENTICATED: 'SET_IS_AUTNENTICATED', //是否认证通过
  SET_USER: 'SET_USER', //用户信息
  SET_OPENTAB: 'SET_OPENTAB', //所有打开的路由
  DEL_TAB: 'DEL_TAB',//删除关闭的标签路由
  SET_ACTIVEINDEX: 'SET_ACTIVEINDEX',//激活状态
  SET_COLLAPSE: 'SET_COLLAPSE' //设置左边菜单是否伸展
}
const state = {  //需要维护的状态
  isAutnenticated: false,  //是否认证
  user: {},  //存储用户信息
  openTab:[],//所有打开的路由
  activeIndex:'', //激活状态
  collapse: false
}
const getters = {
  isAutnenticated: state => state.isAutnenticated,
  user: state => state.user,
  openTab: state => state.openTab,
  activeIndex: state => state.activeIndex,
  collapse: state => state.collapse,
}
const mutations = {
  [types.SET_IS_AUTNENTICATED](state, isAutnenticated) {
    if(isAutnenticated) 
      state.isAutnenticated = isAutnenticated
    else
      state.isAutnenticated = false
  },
  [types.SET_USER](state, user) {
    if(user)
      state.user = user
    else
      state.user = {}
  },
  [types.SET_OPENTAB](state, openTab) {
    if(openTab) {
      state.openTab.push(openTab)
    }
    else
      state.openTab = []
  },
  [types.DEL_TAB](state, delTab) {
    if(delTab) {
      let index = 0;
      for (let option of state.openTab) {
        if (option.route === delTab) {
          break;
        }
        index++;
      }
      state.openTab.splice(index, 1);
      
    }
  },

  [types.SET_ACTIVEINDEX](state, activeIndex) {
    if(activeIndex)
      state.activeIndex = activeIndex
    else
      state.activeIndex = ''
  },
  [types.SET_COLLAPSE](state,collapse) {
    if(collapse)
      state.collapse = collapse
    else
      state.collapse = false
  }

}
const actions = {
  setIsAutnenticated: ({commit}, isAutnenticated) => {
    commit(types.SET_IS_AUTNENTICATED, isAutnenticated)
  },
  setUser: ({commit}, user) => {
    commit(types.SET_USER, user)
  },
  // 添加tabs
  addOpenTab: ({commit}, tag) => {
    commit(types.SET_OPENTAB, tag)
  },
  // to do 删除tabs
  deleteTab: ({commit}, tag) => {
    commit(types.DEL_TAB, tag)
  },

  setActiveIndex: ({commit}, activeIndex) => {
    commit(types.SET_ACTIVEINDEX, activeIndex)
  },
  setCollapse: ({commit}, collapse) => {
    commit(types.SET_COLLAPSE, collapse)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
