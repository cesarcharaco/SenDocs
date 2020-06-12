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
              <q-input class="q-ma-sm text-bold" dark v-model="form.fullName" label="Nombre Completo">
                <template v-slot:prepend>
                  <q-icon name="person" color="primary"></q-icon>
                </template>
              </q-input>
            </div>
          </animation-transition>
          <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
            <div class="animated-body" v-show="show">
              <q-input class="q-ma-sm text-bold" type="email" dark v-model="form.email" label="Correo electrónico">
                <template v-slot:prepend>
                  <q-icon name="mail" color="primary"></q-icon>
                </template>
              </q-input>
            </div>
          </animation-transition>
          <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
            <div class="animated-body" v-show="show">
              <q-input class="q-ma-sm text-bold" type="password" dark v-model="password" label="Contraseña">
                <template v-slot:prepend>
                  <q-icon name="vpn_key" color="primary"></q-icon>
                </template>
              </q-input>
            </div>
          </animation-transition>
          <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
            <div class="animated-body" v-show="show">
              <q-input class="q-ma-sm text-bold" type="password" dark v-model="repeatPassword" label="Repita su Contraseña">
                <template v-slot:prepend>
                  <q-icon name="vpn_key" color="primary"></q-icon>
                </template>
              </q-input>
            </div>
          </animation-transition>
          <div class="row">
            <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
              <div class="col animated-body" v-show="show" style="float: right">
                <q-btn @click="$router.go(-1)" class="shadow-3" color="primary" label="Volver" outline icon="keyboard_backspace" />
              </div>
            </animation-transition>
            <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
              <div class="col animated-body" v-show="show">
                <q-btn class="shadow-3" push color="primary" label="Guardar" style="float: right" icon-right="save" />
              </div>
            </animation-transition>
          </div>
      </q-form>
    </q-page-container>
  </q-layout>
</template>
<script>
import {AnimationVueTransition, AnimationVueTransitionType} from 'vue-animation'
import { required, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  components: {
    [AnimationVueTransition.name]: AnimationVueTransition,
  },
  data () {
    return {
      form: {},
      password: '',
      repeatPassword: '',
      formError: {},
      AnimationType: AnimationVueTransitionType,
      show: false
    }
  },
  validations: {
    form: {
      fullName: { required, maxLength: maxLength(50), minLength: minLength(4) },
      email: { required }
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    },
    password: { required, maxLength: maxLength(256), minLength: minLength(8) }
  },
  mounted () {
    this.show = true
  },
  methods: {
    onSubmit () {
      this.$q.loading.show()
      this.$v.$touch()
      if (!validateErrors()) {
        //Guardar
      }
      this.$q.loading.hide()
    },
    validateErrors () {
      let error = false
      if (this.$v.form.$error || this.$v.password.$error || this.$v.repeatPassword.$error) {
        error = true
        this.formError.fullName = this.form.fullName.length < 2 ? 'Debe ser mayor a 2 caracteres' : this.form.fullName.length > 50 ? 'Ddebe ser menor a 50 caracteres' : 'Ingrese su Nombre Completo'
        this.formError.email = 'Ingrese su Email'
        this.formError.password = this.password.length < 7 ? 'la Contraseña debe ser mayor a 7 caracteres' : this.password.length > 256 ? 'la contraseña no puede ser tan larga' : 'Ingrese su Contraseña'
        this.formError.repeatPassword = 'Las Contraseñas no Coinciden'
      }
      return error
    }
  }
}
</script>
