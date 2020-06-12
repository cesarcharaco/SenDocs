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
              <div class="text-h6 q-mt-sm">Nombre Usuario</div>
              <div class="text-overline">Correo@Email.com</div>
              <div class="text-caption text-grey">Untima conexión</div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      </animation-transition>

      <div class="q-pa-xs">
        <div class="q-gutter-xl row justify-center">
          <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
            <div class="animated-body" v-show="show">
              <q-btn
                round
                size="lg"
                color="teal"
                icon="backup"
                to="/documento/subir"
                class="shadow-3"
              />
            </div>
          </animation-transition>
          <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
            <div class="animated-body" v-show="show">
              <q-btn
                round
                size="lg"
                color="teal"
                icon="edit"
                to="/documento/editar"
                class="shadow-3"
              />
            </div>
          </animation-transition>
        </div>
      </div>
       <q-separator inset class="q-ma-md"/>
      <div class="q-pa-sm text-left text-caption text-grey">Untimos Archivos</div>

      <animation-transition :animation-in-type="AnimationType.BOUNCEINUP" :animation-out-type="AnimationType.ROLLOUT">
      <div
        class="q-pa-sm scroll text-bold text-grey-10 animated-body"
        style="height: 295px"
        v-show="show"
      >
        <q-pull-to-refresh
          @refresh="refresh"
          color="teal"
        >
          <div
            v-for="(last, index) in lastFiles"
            :key="index"
            class="q-mb-sm"
          >
            <q-card class="my-card">
              <q-item to="/archivosdescargados">
                <q-item-section>
                  <q-item-label class="text-h6">{{ last.name+(index+1) }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ last.doc }}</q-item-label>
                </q-item-section>
                <q-separator vertical />
                <q-item-section avatar>
                  <q-avatar>
                    <img
                      src="statics/icons/favicon-128x128.png"
                      style="width: 40px"
                    >
                  </q-avatar>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </q-pull-to-refresh>
      </div>
      </animation-transition>
    </div>
  </q-page>
</template>

<script>
import {AnimationVueTransition, AnimationVueTransitionType} from 'vue-animation'
export default {
  name: 'PageIndex',
  components: {
    [AnimationVueTransition.name]: AnimationVueTransition,
  },
  data () {
    return {
      lastFiles: [
        {
          name: 'Titulo',
          doc: 'Archivo'
        },
        {
          name: 'Titulo',
          doc: 'Archivo'
        },
        {
          name: 'Titulo',
          doc: 'Archivo'
        },
        {
          name: 'Titulo',
          doc: 'Archivo'
        }
      ],
      AnimationType: AnimationVueTransitionType,
      show: false
    }
  },
  mounted () {
    this.show = true
  },
  methods: {
    refresh (done) {
      setTimeout(() => {
        this.items.push({}, {}, {}, {}, {}, {}, {})
        done()
      }, 1000)
    },
    loadUbication () {
      this.$api.get('location').then(v => {
        this.configUser.ubication = v.country
      })
    }
  }
}
</script>
