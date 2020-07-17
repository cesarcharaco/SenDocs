const ArchivoController = require("../Controllers/Http/ArchivoController")

const Archivo = use("App/Models/Archivo")
const User = use("App/Models/User")

exports.getStorage = async (idUser, fileSizeUpload, edit) => {
  let archivos = (await Archivo.where({ idUser: idUser}).fetch()).toJSON()
  let user = await User.find(idUser)
  let storage = 0
  let numberFiles = 0
  let result = {
    error: false,
    msg: 'Sin Error'
  }
  if (archivos.length > 0) {
    numberFiles = archivos.length
    if (user.plan) {
      for (let j in archivos) {
        let element = archivos[j]
        storage = storage + element.fileSize
      }
      let availableStorage = user.plan.storage - storage
      let validateStorage = availableStorage - fileSizeUpload
      let numberValidateUpdate = edit ? 0 : 1
      console.log('numberValida: ', numberValidateUpdate)
      if (validateStorage < 0) {
        result.error = true
        result.msg = 'Si subes este archivo sobrepasa el limite de espacio de tu plan actual'
      } else if (numberFiles + numberValidateUpdate > user.plan.fileLimit) {
        result.error = true
        result.msg = 'Si subes este archivo sobrepasa la cantidad de archivos de tu plan actual'
      } else {
        result.error = false
        result.msg = 'Puede subir el archivo'
      }
    } else {
      result.error = true
      result.msg = 'El usuario no tiene ningun plan asignado, en este momento'
    }
  }
  return result
}
