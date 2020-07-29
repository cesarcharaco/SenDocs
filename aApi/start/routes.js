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
    Route.post('forgot_password', 'UserController.forgotPassword') // enviar codigo de cambio de contraseña
    Route.post('verify_code', 'UserController.verifyCode') // enviar codigo de cambio de contraseña
    Route.put('change_password', 'UserController.changePassword') // enviar codigo de cambio de contraseña

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
    Route.delete('archives/:id', 'ArchivoController.destroy');
    Route.put('archives/:id/:filet', 'ArchivoController.update');
    Route.put('renovate_file/:id', 'ArchivoController.renovate');
    Route.get('show_file/:id', 'ArchivoController.show');
    Route.get('get_file/:filename', 'UploadController.getFile');
    Route.post('test_email', 'ArchivoController.enviarCorreo');
    Route.get('dashboard_adm', 'DashboardController.dashboardAdm');
    Route.get('users', 'UserController.index');
    Route.put('assign_plan/:idUser', 'UserController.assignPlan');
    Route.get('get_info_plan', 'UserController.getInfoPlan');
    Route.get('notifications', 'NotificationController.show');
    Route.put('notifications', 'NotificationController.seeAll');
    Route.put('notification_disable/:id', 'NotificationController.update');
    //Route.get('obtener/:archiveName', 'UploadController.getFile');

  }).middleware("auth")
);
