<template>
  <!-- Nuevo proyecto -->
  <q-page class=" row bg-grey-1">
    <div class="col" v-show="show">
      <q-separator />
      <animation-transition :animation-in-type="AnimationType.ZOOMIN" :animation-out-type="AnimationType.ROLLOUT">
      <div class="q-pa-sm row items-start justify-start animated-body" v-show="show">
        <q-card
          class="bg-grey-1 shadow-2 q-ma-xs q-mt-sm"
          style="width: 100%;border-radius:20px"
        >
          <q-card-section horizontal>
            <q-card-section class="col-3 flex flex-center">
              <q-avatar size="50px">
                <img src="statics/icons/favicon-128x128.png">
              </q-avatar>
            </q-card-section>
            <q-separator inset vertical />
            <q-card-section class="q-pt-xs q-mt-sm">
              <div class="text-h6 q-mt-sm">{{userInfo.fullName}}</div>
              <div class="text-overline">{{userInfo.email}}</div>
              <q-separator inset />
              <div class="text-caption text-bold q-mt-sm">Informacion del Plan</div>
              <div class="column text-grey" v-if="planInfo.plan">
                <div v-if="planInfo.plan.name != 'Plan 4'">
                  Cantidad: {{planInfo.avaiableFiles}} / {{planInfo.plan.fileLimit}}
                </div>
                <div v-else-if="planInfo.plan.name == 'Plan 4'">
                  Sin limite de Archivos
                </div>
                <div>
                  Disponible: {{ planInfo.availableStorage}} / {{ planInfo.plan.storage  }}
                </div>
              </div>
              <div v-else-if="planInfo.error" class="text-caption text-negative" >{{planInfo.msg}} </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      </animation-transition>
       <q-separator inset class="q-ma-md"/>
      <animation-transition :animation-in-type="AnimationType.BOUNCEINUP" :animation-out-type="AnimationType.ROLLOUT">
      <div
        class="q-pa-sm text-bold text-grey-10 animated-body"
        v-show="show"
      >
      <Archivos />
      </div>
      </animation-transition>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 20]">
      <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
        <div class="animated-body" v-show="show">
          <q-btn round size="20px" color="primary" icon="backup" to="/documento/subir" class="shadow-3" />
        </div>
      </animation-transition>
    </q-page-sticky>
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
        if (!this.planInfo.error) {
          let totalgb = ((this.planInfo.availableStorage * 1) / 1073741824).toFixed(2) // esta cantidad es 1 gb en Bytes
          let totalmb = (totalgb * 1024)
          let availableStorage = totalmb
          this.planInfo.availableStorage = totalmb
          totalgb = ((this.planInfo.plan.storage * 1) / 1073741824).toFixed(2) // esta cantidad es 1 gb en Bytes
          totalmb = (totalgb * 1024)
          this.planInfo.plan.storage = totalmb + 'MB'
          this.planInfo.availableStorage = (totalmb - availableStorage).toFixed(2) + 'MB'

          let totalFiles = this.planInfo.plan.fileLimit - this.planInfo.avaiableFiles
          this.planInfo.avaiableFiles = totalFiles
        } else {

        }
        console.log(res, 'res del plan')
      })
      this.$q.loading.hide()
    }
  }
}
</script>
