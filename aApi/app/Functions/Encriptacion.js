const fs = require('fs')
const encrypt = require('node-file-encrypt')
let encryptPath = ''

exports.encrypt = async (filePath) => {
  let f = new encrypt.FileEncrypt(filePath)
  f.openSourceFile()
  f.encrypt('111111')
  encryptPath = f.encryptFilePath
  console.log(f, 'resultado encriptar')
  return f
}

exports.decrypt = async (filePath) => {
  //fs.unlink(filePath, function() {})
  let f = new encrypt.FileEncrypt(filePath)
  f.openSourceFile()
  f.decrypt('111111')
  console.log(f, 'resultado desencriptar1')
  return f.decryptFilePath
}

exports.getOriginalName = async (filePath) => {
  let f = new encrypt.FileEncrypt(filePath)
  f.openSourceFile()
  console.log(f.info('111111'))
  return 'obteniendo nombre original del archivo encryptado'
}

exports.dualSync = async (filePath) => {
  let f = new encrypt.FileEncrypt(filePath)
  f.openSourceFile()
  f.encryptAsync('111111').then(function() {
    encryptPath = f.encryptFilePath
    console.log("encrypt async done")
    fs.unlink(filePath, function() {})
    let d = new encrypt.FileEncrypt(encryptPath)
    d.openSourceFile()
    d.decryptAsync('111111').then(function() {
      console.log("decrypt async done")
    })
  })
  return 'Sincrozado Finish'
}
