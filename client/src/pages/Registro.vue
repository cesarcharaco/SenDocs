<template>
  <q-layout class="fondo">
    <q-page-container>
      <animation-transition :animation-in-type="AnimationType.BOUNCEINDOWN" :animation-out-type="AnimationType.ROLLOUT">
        <div class="row justify-center animated-body" v-show="show">
          <img src="../statics/Sen-Docs logo.png" alt="Logo Sendocs" style="width: 40%;">
        </div>
      </animation-transition>
      <q-form class="q-gutter-md q-ma-md">
        <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
            <div class="animated-body" v-show="show">
              <q-input class="q-ma-sm text-bold" dark v-model="form.nombreC" label="Nombre Completo">
                <template v-slot:prepend>
                  <q-icon name="person" color="primary"></q-icon>
                </template>
              </q-input>
            </div>
          </animation-transition>
          <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
            <div class="animated-body" v-show="show">
              <q-input class="q-ma-sm text-bold" type="email" dark v-model="form.correo" label="Correo electrónico">
                <template v-slot:prepend>
                  <q-icon name="mail" color="primary"></q-icon>
                </template>
              </q-input>
            </div>
          </animation-transition>
          <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
            <div class="animated-body" v-show="show">
              <q-input class="q-ma-sm text-bold" type="password" dark v-model="form.contrasena" label="Contrasena">
                <template v-slot:prepend>
                  <q-icon name="vpn_key" color="primary"></q-icon>
                </template>
              </q-input>
            </div>
          </animation-transition>
          <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
            <div class="animated-body" v-show="show">
              <q-input class="q-ma-sm text-bold" type="password" dark v-model="password2" label="Repita su Contrasena">
                <template v-slot:prepend>
                  <q-icon name="vpn_key" color="primary"></q-icon>
                </template>
              </q-input>
            </div>
          </animation-transition>
          <div class="row">
            <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
              <div class="col animated-body" v-show="show" style="float: right">
                <q-btn @click="$router.go(-1)" class="shadow-3" color="primary" label="Volver" outline icon="keyboard_backspace" style="border-radius:15px" />
              </div>
            </animation-transition>
            <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
              <div class="col animated-body" v-show="show">
                <q-btn class="glossy shadow-3" push color="primary" label="Guardar" style="float: right; border-radius:15px" icon-right="save" />
              </div>
            </animation-transition>
          </div>
      </q-form>
    </q-page-container>
  </q-layout>
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
      password2: '',
      AnimationType: AnimationVueTransitionType,
      show: false
    }
  },
  mounted () {
    this.show = true
  },
  methods: {
    onSubmit () {
      if (this.form.contrasena === password2) {

      } else {

      }
    }
  }
}
</script>
