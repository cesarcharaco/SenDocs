<template>
  <div>
    <animation-transition :animation-in-type="AnimationType.ZOOMIN" :animation-out-type="AnimationType.ROLLOUT">
    <div class="animated-body" v-show="show">
    <q-card
      class="shadow-2 q-ma-sm"
      bordered
      v-for="index in test"
      :key="index"
    >
      <q-card-section>
        <div class="row justify-center">
          <div class="column col">
            <div class="col">
              <q-chip
                icon="event"
                class="q-pa-md"
                color="primary"
                size="10px"
                text-color="white"
              >Etiqueta</q-chip>
            </div>
            <div class="col q-mt-md q-ml-sm text-bold">
              Nombre del Archivo
            </div>
          </div>
          <q-separator
            vertical
            inset
            class="q-ma-sm"
          />
          <div class="q-mt-sm column">
            <div class="col">Tipo</div>
            <div class="col">Correo Destino</div>
            <div class="col">fecha de Vencimiento</div>
          </div>
          <q-separator
            vertical
            inset
            class="q-ma-sm"
          />
          <div class="q-mt-md q-ml-sm">
            <q-btn
              push
              round
              color="primary"
              icon="update"
              @click="dialog = true"
            />
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
        </div>
      </q-card-section>
    </q-card>
    </div>
    </animation-transition>

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
      test: 2,
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
