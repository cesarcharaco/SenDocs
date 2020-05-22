export function loginStart (state) {
  state.loggingIn = true
}
export function loginStop (state, errorMessage) {
  state.loggingIn = false
  state.loginError = errorMessage
}

export function updateAccessToken (state, GM_SESSION_INFO) {
  if (GM_SESSION_INFO) {
    state.GM_SESSION_INFO = GM_SESSION_INFO
  } else {
    state.GM_SESSION_INFO = {}
  }
}
export function setCurrentModule (state, payload) {
  state.currentModel = payload.currentModel
  state.currentModule = payload.currentModule
}
export function googleBtnShow (state) {
  state.isContacts = true
}

export function googleBtnHide (state) {
  state.isContacts = false
}

export function tabInfoSales (state) {
  state.listCustomerInfo = true
}

export function tabInfoDependents (state) {
  state.listCustomerInfo = false
}

export function showAll (state) {
  state.customShowListable = 'Todos'
}

export function showNextMonth (state) {
  state.customShowListable = 'Mes Siguiente'
}

export function showCurrentMonth (state) {
  state.customShowListable = 'Mes Actual'
}
export function login (state, data) {
  localStorage.setItem('GM_SESSION_INFO', JSON.stringify(data.GM_SESSION_INFO))
  state.GM_SESSION_INFO = data.GM_SESSION_INFO
  state.user = data.user
}
export function dataUser (state, data) {
  console.log(data)
  state.user = data
}
export function logout (state) {
  localStorage.removeItem('GM_SESSION_INFO')
  state.GM_SESSION_INFO = ''
  state.user = ''
}
