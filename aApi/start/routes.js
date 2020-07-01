'use strict'

/*
|--------------------------------------------------------------------------
| Routes
  Existen 2 grupos de rutas: Las que necesitan autenticación del usuario y las que no. TOMAR MUY EN CUENTA ESTO
  Dentro del grupo de las que necesitan autenticación se debe especificar el middleware para verificar si el
  usuario(autenticado) tiene el permiso para acceder a esa ruta. Ejemplo: .middleware('verifyPermission:1')
  El número 1 indica el permiso que debe tener para acceder a esa ruta
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return {
    greeting: 'Hello world in JSON'
  }
})

const addPrefixToGroup = group => {
  // Grupo para rutas con prefijo /api/
  group.prefix("api");
  return group;
};


addPrefixToGroup(
  Route.group(() => {
    // Insertar rutas sin protección de autenticación aquí
    Route.post("login", "UserController.login");
    Route.post("register", "UserController.register")

  })
);

addPrefixToGroup(
  Route.group(() => {
    // Insertar rutas con protección de autenticación aquí

    /////////////Imagenes///////////////////
    //Route.post('subirImagenes', 'UploadController.uploadShopImage');
    ///////////////////////////////

    ////////////Usuarios////////////////////////
    Route.post('uploads', 'UploadController.upload');
    Route.get('archives', 'ArchivoController.index');
    Route.delete('archives', 'ArchivoController.destroy');
    Route.put('archives/:id/:filet', 'ArchivoController.update');
    Route.put('renovate_file/:id', 'ArchivoController.renovate');
    Route.get('show_file/:id', 'ArchivoController.show');
    Route.get('get_file/:filename', 'UploadController.getFile');
    Route.post('test_email', 'ArchivoController.enviarCorreo');
    // Route.post('obtener/:filename', 'UploadController.getFile');

  }).middleware("auth")
);
