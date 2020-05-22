import Vue from 'vue'
import Vuex from 'vuex'

import generals from './generals'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      generals
    },

    strict: process.env.DEV
  })

  return Store
}
