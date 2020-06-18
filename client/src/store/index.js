import Vue from 'vue'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import generals from './generals'

Vue.use(Vuex)
Vue.use(Vuelidate)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      generals
    },

    strict: process.env.DEV
  })

  return Store
}
