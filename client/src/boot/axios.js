import axios from 'axios'
import env from '../env'
import {
  Notify
} from 'quasar'

const axiosInstance = axios.create({
  baseURL: env.apiUrl // url base cargada de archivo env.js
})

export default async ({
  store,
  Vue
}) => {
  // Vue.prototype.$axios = axios
  Vue.prototype.$api = axiosInstance

  axiosInstance.interceptors.response.use(function (response) {
    console.log('axiosResponse', response)
    // Todo bien con la respuesta
    if (response.config.method === 'post') {
      if (response.status === 201) {
        if (response.data.token === undefined) { // Si no es login
          Notify.create({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Registro guardado con éxito!'
          })
        } else { // Es Login
          localStorage.setItem('GM_SESSION_INFO', JSON.stringify(response.data))
        }
      }
    }
    return response.data
  }, function (error) {
    // Error en la respuesta
    console.log('debug', error.response)
    if (error.response === undefined) { // Si no hubo comunicación con el servidor
      console.log('no hay conexion con el servidor', error)
      Notify.create({
        color: 'red-5',
        textColor: 'white',
        icon: 'fas fa-exclamation-triangle',
        message: 'No se pudo establecer conexión con el servidor' + error
      })
    } else {
      if (error.response.status === 401) {
        Notify.create({
          message: 'Correo y/o Contraseña Incorrectos',
          color: 'black'
        })
      } else if (error.response.status === 403) {
        Notify.create({
          message: error.response.data,
          color: 'red'
        })
      } else if (error.response.status === 404) {
        Notify.create({
          message: 'Ruta no encontrada - 404',
          color: 'black'
        })
      } else if (error.response.status === 422) {
        Notify.create({
          message: 'Datos Inválidos: ' + error.response.data[0].message,
          color: 'red',
          position: 'bottom'
        })
      } else if (error.response.status === 500) {
        Notify.create({
          message: 'Error de conexión con el servidor',
          color: 'red',
          position: 'bottom'
        })
      }
      var data = error.response.data
      console.log('error.response.data.error', data)
      if (data) {
        if (data.statusCode === 403) {
          Notify.create({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: data.message
          })
        }
        if (data.statusCode === 500) {
          Notify.create({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Error interno en servidor' + data.message
          })
          // return Promise.reject(data.response.data.error)
        }
        // Añadir mas mensajes segun codigos de error especificos y mostrar las notificaciones correspondientes

        // Notify.create(error.response.data.error.message)
        // console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message)
      }
      // console.log(error.config)
    }

    // return Promise.reject(data)
  })

 /*  axiosInstance.interceptors.request.use(async function (config) {
      // Antes de enviar cada petición se añade el token si existe

      store.dispatch('generals/fetchAccessToken')
      const token = (store.state.generals.GM_SESSION_INFO !== null) ? store.state.generals.GM_SESSION_INFO.token : false
      console.log('token', token)
      if (token) {
        if (!config.headers) {
          config.headers = {}
        }
        config.headers = {
          Authorization: 'Bearer ' + token
        }
      }
      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }) */
}

export {
  axiosInstance
}
