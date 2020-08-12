<template>
  <!-- Nuevo proyecto -->
  <q-page class=" row fondo-gris">
    <div class="col" v-show="show">
      <div class="row q-mt-xl q-ml-md ">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="home" label="Home" class="text-grey-8" style="font-size:22px" />
        </q-breadcrumbs>
        <q-space />
        <q-btn color="primary" to="/documento/subir" rounded label="enviar nuevo" class="q-mb-sm q-mr-md button-enviar-nuevo-home" icon="cloud_upload" dense size="md" />
      </div>
      <q-separator inset class="q-mb-md"/>
      <animation-transition :animation-in-type="AnimationType.BOUNCEINUP" :animation-out-type="AnimationType.ROLLOUT">
      <div class="q-pa-sm text-bold text-grey-10 animated-body" v-show="show">
      <Archivos />
      </div>
      </animation-transition>
    </div>
  </q-page>
</template>

<script>
import {AnimationVueTransition, AnimationVueTransitionType} from 'vue-animation'
import Archivos from '../pages/ArchivosDescargados.vue'
export default {
  name: 'PageIndex',
  components: {
    [AnimationVueTransition.name]: AnimationVueTransition,
    Archivos
  },
  data () {
    return {
      userInfo: '',
      AnimationType: AnimationVueTransitionType,
      show: false,
      planInfo: {}
    }
  },
  async mounted () {
    this.show = true
    await this.getUser()
    await this.getPlan()
  },
  methods: {
    getUser () {
      this.userInfo = JSON.parse(localStorage.getItem('SD_SESSION_INFO'))
    },
    async getPlan () {
      this.$q.loading.show()
      await this.$api.get('get_info_plan').then(res => {
        /* if (res.error) {
            this.$q.notify({
              message: 'Ya formas parte de thot20',
              color: 'positive'
            })
          } */
        this.planInfo = res
        console.log(res, ' res del plan 111')
        if (!this.planInfo.error) {
          let totalgb = ((this.planInfo.availableStorage * 1) / 1073741824).toFixed(2) // esta cantidad es 1 gb en Bytes
          let totalmb = (totalgb * 1024)
          let availableStorage = totalmb
          this.planInfo.availableStorage = totalmb
          totalgb = ((this.planInfo.plan.storage * 1) / 1073741824).toFixed(2) // esta cantidad es 1 gb en Bytes
          totalmb = (totalgb * 1024)
          this.planInfo.plan.storage = (totalmb).toFixed(2) + 'MB'
          this.planInfo.availableStorage = (totalmb - availableStorage).toFixed(2) + 'MB'

          let totalFiles = this.planInfo.plan.fileLimit - this.planInfo.avaiableFiles
          this.planInfo.avaiableFiles = totalFiles
        } else {

        }
      })
      this.$q.loading.hide()
    }
  }
}
</script>
