<template>
  <div>
    <q-item-label header>Archivos Subidos</q-item-label>
    <animation-transition :animation-in-type="AnimationType.ZOOMIN" :animation-out-type="AnimationType.ROLLOUT">
    <div class="animated-body" v-show="show">
    <q-card bordered class="q-ma-sm shadow-3" v-for="index in test" :key="index">
        <q-item>
          <q-item-section>
            <q-item-label class="text-bold">Nombre Archivo
              <q-badge color="blue">
                Etiqueta
              </q-badge>
            </q-item-label>
            <q-item-label caption class="text-bold">Correo Destino</q-item-label>
            <q-item-label caption class="text-bold">Tipo</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>Fecha Vencimiento</q-item-label>
            <q-btn flat class="q-mt-xs q-mr-sm" round color="primary" icon="update" @click="dialog = true" />
          </q-item-section>
        </q-item>
      </q-card>
    </div>
    </animation-transition>
    <q-dialog v-model="dialog">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Nombre del Archivo</div>
                  <div class="text-subtitle2">Nueva Fecha</div>
                </q-card-section>
                <q-card-section>
                  <div class="row justify-center">
                    <q-date
                      v-model="form.fvencimiento"
                      minimal
                    />
                  </div>
                  <div class="row justify-center">
                    <q-input
                      v-model="form.hvencimiento"
                      label="Hora de Vencimiento"
                      mask="time"
                      style="width:180px"
                      :rules="['time']"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="access_time"
                          class="cursor-pointer"
                          color="primary"
                        >
                          <q-popup-proxy
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="form.hvencimiento">
                              <div class="row items-center justify-end q-gutter-sm">
                                <q-btn
                                  label="Cancel"
                                  color="primary"
                                  flat
                                  v-close-popup
                                />
                                <q-btn
                                  label="OK"
                                  color="primary"
                                  flat
                                  v-close-popup
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn
                    class="q-pa-sm"
                    rounded
                    color="primary"
                    flat
                    label="Cancelar"
                    v-close-popup
                  />
                  <q-btn
                    class="q-pa-sm"
                    rounded
                    color="primary"
                    label="Renovar"
                    v-close-popup
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
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
      data: [],
      form: {},
      dialog: false,
      test: 10,
      AnimationType: AnimationVueTransitionType,
      show: false
    }
  },
  mounted() {
    this.show = true
  },
}
</script>

<style>
</style>
