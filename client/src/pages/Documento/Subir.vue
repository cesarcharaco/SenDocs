<template>
  <div>
    <animation-transition :animation-in-type="AnimationType.BOUNCEINDOWN" :animation-out-type="AnimationType.ROLLOUT">
      <q-item-label header class="text-bold" v-show="show">Sube tu Archivo</q-item-label>
    </animation-transition>
    <q-card class="shadow-3 q-pa-md q-ma-sm" bordered>
      <div class="q-pa-sm">
        <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
          <q-input
            v-model="form.nombre"
            label="Nombre del Documento"
            v-show="show"
          />
        </animation-transition>
        <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
          <q-input
            v-model="form.etiqueta"
            label="Etiqueta del Documento"
            v-show="show"
          />
        </animation-transition>
        <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
          <q-input
            v-model="form.correo"
            label="Correo"
            v-show="show"
          />
        </animation-transition>
        <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
          <q-input
            v-model="form.fvencimiento"
            mask="date"
            readonly
            :rules="['date']"
            label="Fecha de Vencimiento"
            v-show="show"
          >
            <template v-slot:append>
              <q-btn
                icon="event"
                color="primary"
                class="q-mr-md"
                round
                flat
              >
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="form.fvencimiento"
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-btn>
            </template>
          </q-input>
        </animation-transition>
        <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
          <q-file bottom-slots v-model="model" label="Subir Archivo" v-show="show" counter>
            <template v-slot:prepend>
              <q-icon name="cloud_upload" color="primary" @click.stop />
            </template>
            <template v-slot:append>
              <q-icon name="close" color="negative" @click.stop="model = null" class="cursor-pointer" />
            </template>
          </q-file>
        </animation-transition>

        <q-card-actions align="right">
          <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
            <q-btn
              class="glossy q-pa-sm q-mt-md"
              color="primary"
              label="Subir"
              style="width:100px; border-radius:20px"
              v-show="show"
            />
          </animation-transition>
        </q-card-actions>
      </div>
    </q-card>
  </div>
</template>

<script>
import {AnimationVueTransition, AnimationVueTransitionType} from 'vue-animation'
export default {
  components: {
    [AnimationVueTransition.name]: AnimationVueTransition,
  },
  data () {
    return {
      form: {},
      AnimationType: AnimationVueTransitionType,
      show: false,
      model: null
    }
  },
  mounted () {
    this.show = true
  },
  methods: {
    factoryFn (files) {
      console.log(files, 'filesss')
    }
  }
}
</script>

<style>
</style>
