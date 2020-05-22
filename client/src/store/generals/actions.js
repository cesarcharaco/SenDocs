export function fetchAccessToken ({ commit }) {
  commit('updateAccessToken', JSON.parse(localStorage.getItem('GM_SESSION_INFO')))
}
export function logout ({ commit }) {
  localStorage.removeItem('GM_SESSION_INFO')
  commit('logout')
}
export async function saveUser ({ commit }) {
  await this._vm.$api.get('userInfoWithRole').then(v => {
    if (v) {
      console.log(v)
      commit('dataUser', v[0])
    }
  })
}
/* eslint-disable */ 