
const routes = [
  { path: '/registro', component: () => import('pages/Registro.vue') },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/archivosdescargados', component: () => import('pages/ArchivosDescargados.vue') },
      { path: '/documento/editar', component: () => import('pages/Documento/Edit.vue') },
      { path: '/documento/subir', component: () => import('pages/Documento/Subir.vue') },
      { path: '/home2', component: () => import('pages/Documento/Listado.vue') },
      { path: '/home', component: () => import('pages/Home_SenDocs.vue') },
    ]
  },
  { path: '/inicio', component: () => import('pages/InicioAplicacionSD.vue') },
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
