<template>
  <div>
    <q-item-label header>Archivos Subidos</q-item-label>
    <animation-transition :animation-in-type="AnimationType.ZOOMIN" :animation-out-type="AnimationType.ROLLOUT">
    <div class="animated-body" v-show="show" v-if="data.length > 0" >
    <q-card bordered class="q-ma-sm shadow-3" v-for="(archive, index) in data" :key="index" >
        <q-item>
          <q-item-section>
            <q-item-label class="text-bold">{{archive.name}}
              <q-badge color="blue">
                {{archive.label}}
              </q-badge>
            </q-item-label>
            <q-item-label caption class="text-bold" >{{archive.emails[0]}}</q-item-label>
            <!-- <q-item-label caption class="text-bold"></q-item-label> -->
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{archive.expiration}}</q-item-label>
            <q-btn flat class="q-mt-xs q-mr-sm" round color="primary" icon="update" @click="dialog = true" />
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
                    <q-date
                      v-model="data[globalIndex].expiration"
                      minimal
                    />
                  </div>
                  <!-- <div class="row justify-center">
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
                  </div> -->
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
      globalIndex: 0,
      AnimationType: AnimationVueTransitionType,
      show: false
    }
  },
  mounted() {
    this.show = true
    this.getRecord()
  },
  methods: {
    getRecord () {
      this.$api.get('archives').then(res => {
        this.data = res
      })
    }
  }
}
</script>

<style>
</style>
