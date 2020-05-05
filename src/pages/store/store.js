// Certifique-se de chamar Vue.use(Vuex) primeiro se estiver usando o sistema de módulos
import Vue from 'vue'
import Vuex from 'vuex'
import AuthModule from './AuthModule';
import FileModule from './FileModule';


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: AuthModule,
    file: FileModule,
  },
    state: {
      alert_message:null,
      show_tabbar:true
    },

    getters:{
      alert_message:state=>state.alert_message,
      show_tabbar:state=>state.show_tabbar
    },

    mutations: {
      setAlertMessage(state,payload) {
        state.alert_message = payload
      },
      setShowTabs(state,payload) {
        state.show_tabbar = payload
      }
    }
  })