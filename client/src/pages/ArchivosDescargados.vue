<template>
  <q-card class="card-border q-ma-sm">
    <div class="row q-pa-sm q-pt-xl q-ml-sm">
      <q-btn color="primary" size="sm" label="Recibidos" icon-right="email" style="border-radius:10px" />
      <q-btn color="grey" size="sm" label="Enviados" class="q-ml-md" flat icon-right="email" style="border-radius:10px" />
    </div>
    <q-separator inset />
    <animation-transition :animation-in-type="AnimationType.ZOOMIN" :animation-out-type="AnimationType.ROLLOUT">
    <div v-show="show" v-if="data.length > 0" >
    <q-card>
        <q-item class="q-ma-sm" v-for="(archive, index) in data" :key="index">
          <q-item-section avatar>
            <q-icon name="sort" size="40px" :color="archive.status === 0 ? 'primary' : 'grey'" :label="archive.status === 0 ? 'Activo' : 'Caduco'" />
          </q-item-section>
          <q-item-section  @click="download(archive.archiveNameEncryp, archive.status, archive.archiveName)">
            <q-item-label class="text-bold">{{archive.name}}
              <q-badge color="blue">
                {{archive.label}}
              </q-badge>
            </q-item-label>
            <q-item-label caption class="text-bold" >{{archive.emails[0]}}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{archive.expiration}}</q-item-label>
            <div class="row">
              <q-btn color="primary" round flat icon="more_vert" v-if="archive.status == 0">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable class="q-mr-md" @click="dialog = true, globalIndex = index">
                      <q-item-section>
                        <q-btn flat class="q-mt-xs q-mr-sm" round color="primary" icon="update" />
                      </q-item-section>
                      <q-item-section class="text-bold">Renovar</q-item-section>
                    </q-item>
                    <q-separator inset />
                    <q-item clickable @click="$router.push('/documento/editar/' + archive._id)" >
                      <q-item-section>
                        <q-btn flat class="q-mt-xs q-mr-sm" round color="primary" icon="edit" />
                      </q-item-section>
                      <q-item-section class="text-bold" >Editar</q-item-section>
                    </q-item>
                    <q-separator inset />
                    <q-item clickable @click="deleteFile(archive._id)" >
                      <q-item-section>
                        <q-btn flat class="q-mt-xs q-mr-sm" round color="primary" icon="delete" />
                      </q-item-section>
                      <q-item-section class="text-bold" >Eliminar</q-item-section>
                    </q-item>
                    <!-- <q-item clickable @click="test(archive.archiveName)" >
                      <q-item-section>
                        <q-btn flat class="q-mt-xs q-mr-sm" round color="primary" icon="done" />
                      </q-item-section>
                      <q-item-section class="text-bold" >Test</q-item-section>
                    </q-item>
                    !-->
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
    <div class="row justify-center items-center absolute-center" v-if="data.length < 1">
      Sin Archivos Subidos
    </div>
    </animation-transition>
    <q-dialog v-model="dialog">
      <q-card v-if="data.length > 0" >
        <q-card-section>
          <div class="text-h6"> {{data[globalIndex].name}} </div>
          <div class="text-subtitle2">Nueva Fecha</div>
        </q-card-section>
        <q-card-section>
          <div class="row justify-center">
            <q-input v-show="show" v-model="data[globalIndex].expiration" class="input-style q-pa-sm" dense borderless >
              <template v-slot:prepend>
                <q-btn icon="event" class="cursor-pointer" color="primary" flat round>
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date v-model="data[globalIndex].expiration" mask="DD/MM/YYYY HH:mm" />
                  </q-popup-proxy>
                </q-btn>
              </template>

              <template v-slot:append>
                <q-btn icon="access_time" class="cursor-pointer" color="primary" flat round>
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time v-model="data[globalIndex].expiration" mask="DD/MM/YYYY HH:mm" format24h />
                  </q-popup-proxy>
                </q-btn>
              </template>
            </q-input>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn class="q-pa-sm" color="primary" outline label="Cancelar" v-close-popup style="border-radius:15px" />
          <q-btn class="q-pa-sm" color="primary" style="border-radius:15px" label="Renovar" @click="renovate(data[globalIndex])" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import {AnimationVueTransition, AnimationVueTransitionType} from 'vue-animation'
import env from '../env'
  export default {
  components: {
    [AnimationVueTransition.name]: AnimationVueTransition,
  },
  data () {
    return {
      data: [],
      form: {},
      dialog: false,
      globalIndex: 0,
      AnimationType: AnimationVueTransitionType,
      show: false,
      showDialogDelete: false,
      loadingDelete: true
    }
  },
  mounted() {
    this.show = true
    this.getRecord()
  },
  methods: {
    deleteFile (id) {
      this.$q.dialog({
        title: 'Confirmar',
        message: '¿Esta seguro que desea Eliminar el Registro y Su Archivo del Servidor?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.confirmDelete(id)
      })
    },
    confirmDelete (id) {
      this.$q.loading.show({
        message: 'Cargando...'
      })
      this.$api.delete(`archives/${id}`).then(res => {
        this.$q.notify({
          message: 'Eliminado de Forma Exitosa',
          color: 'green',
          type: 'positive'
        })
        this.getRecord()
      })
      this.$q.loading.hide()
    },
    async download (file, status, archiveName) {
      if (status === 0) {
        this.$q.dialog({
          title: 'Confirmar',
          message: '¿Esta seguro que desea descargar el archivo?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$api.get(`file/${file}`, { responseType: 'blob' }).then(res => {
          console.log('aquiii', res)
          const blob = new Blob([res])
          // const ext = file.split('.')
          const fileName = `${archiveName}`
          console.log(fileName, 'filename')
          if (this.$q.platform.is.mobile) { // Si es teléfono
            this.saveBlob2File(fileName, blob)
          } else { // Si es navegador
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
            this.$api.delete('file_delete/' + fileName).then(res => {
            })
          }
          //this.$q.loading.hide()
          }).catch(function (error) {
            console.log('error descargando', error)
          })
        })
      }
    },
    confrim (file) {
      console.log(file)
      return
      //this.$q.loading.show()
      this.$api.get(`uploads/${file}`, { responseType: 'blob' }).then(res => {
        const blob = new Blob([res])
        const ext = file.split('.')
        const fileName = `${file} ${ext[ext.length - 1]}`

        if (this.$q.platform.is.mobile) { // Si es teléfono
          this.saveBlob2File(fileName, blob)
        } else { // Si es navegador
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
        }
        //this.$q.loading.hide()
      }).catch(function (error) {
        console.log('error descargando', error)
      })
    },
    async getRecord () {
      this.$q.loading.show({
        message: 'Cargando...'
      })
      await this.$api.get('archives').then(res => {
        this.data = res
      })
      this.$q.loading.hide()
    },
    renovate (data) {
      console.log('data: ',data)
      this.$q.loading.show({
        message: 'Guardando...'
      })
      this.$api.put('renovate_file/' + data._id, data ).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Renovado de Forma Exitosa',
            color: 'positive',
            type: 'positive'
          })
        }
        console.log('res: ', res)
      })
      this.$q.loading.hide()
    },
    test (archiveName) {
      this.$api.get('get_file/' + archiveName).then(res => {
        console.log(res, 'RESSSSS TESTTTTTTTTTTTTT')
      })
    }
  }
}
</script>

<style>
</style>
