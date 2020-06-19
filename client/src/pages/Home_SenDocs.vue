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
            <q-card-section class="col-4 flex flex-center">
              <q-avatar size="100px">
                <img src="statics/icons/favicon-128x128.png">
              </q-avatar>
            </q-card-section>
            <q-separator inset vertical />
            <q-card-section class="q-pt-xs q-mt-sm">
              <div class="text-h6 q-mt-sm">{{userInfo.fullName}}</div>
              <div class="text-overline">{{userInfo.email}}</div>
              <div class="text-caption text-grey">ultima conexión</div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      </animation-transition>
       <q-separator inset class="q-ma-md"/>
      <animation-transition :animation-in-type="AnimationType.BOUNCEINUP" :animation-out-type="AnimationType.ROLLOUT">
      <div
        class="q-pa-sm scroll text-bold text-grey-10 animated-body"
        style="height: 295px"
        v-show="show"
      >
      <Archivos />
      </div>
      </animation-transition>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
        <div class="animated-body" v-show="show">
          <q-btn round size="lg" color="teal" icon="backup" to="/documento/subir" class="shadow-3" />
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
      show: false
    }
  },
  mounted () {
    this.show = true
    this.getUser()
  },
  methods: {
    getUser () {
      this.userInfo = JSON.parse(localStorage.getItem('SD_SESSION_INFO'))
    }
  }
}
</script>
