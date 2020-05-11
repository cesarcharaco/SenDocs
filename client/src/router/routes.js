
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/archivosdescargados', component: () => import('pages/ArchivosDescargados.vue') },
      { path: '/documento/editar', component: () => import('pages/Documento/Edit.vue') }
    ]
  },
  { path: '/inicio', component: () => import('pages/InicioAplicacionSD.vue') }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
