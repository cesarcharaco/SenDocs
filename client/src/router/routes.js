
const routes = [
  { path: '/registro', component: () => import('pages/Registro.vue') },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/archivosdescargados', component: () => import('pages/ArchivosDescargados.vue') },
      { path: '/documento/editar/:id', component: () => import('pages/Documento/Edit.vue') },
      { path: '/documento/subir', component: () => import('pages/Documento/Subir.vue') },
      { path: '/home2', component: () => import('pages/Documento/Listado.vue') },
      { path: '/home', component: () => import('pages/Home_SenDocs.vue') },
      { path: '/profile', component: () => import('pages/Profile.vue') },
      { path: '/test', component: () => import('pages/PruebaPaypal.vue') },
    ]
  },
  {
  path: '/home_adm',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/dashboard', component: () => import('pages/Admin/Dashboard.vue') },
      { path: '/lista_clientes', component: () => import('pages/Admin/ListaClientes.vue') },
      { path: '/crear_usuario', component: () => import('pages/Admin/CrearUsuario.vue') }
    ]
  },
  { path: '/inicio', component: () => import('pages/InicioAplicacionSD.vue') },
  { path: '/verificacion_codigo/:email', component: () => import('pages/VerificationCode.vue') },
  { path: '/change_password/:email', component: () => import('pages/RecoverPassword.vue') },
  { path: '/', component: () => import('layouts/Login.vue') }
]
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
