<template>
  <q-layout class="fondo">
    <q-page-container>
      <animation-transition :animation-in-type="AnimationType.BOUNCEINDOWN" :animation-out-type="AnimationType.ROLLOUT">
        <div class="row justify-center animated-body" v-show="show">
          <img src="../statics/Sen-Docs logo.png" alt="Logo thot20" style="width: 40%;">
        </div>
      </animation-transition>
      <q-card class="shadow-2 card-border q-ma-md q-pt-md">
        <q-card-section v-if="pasoN === 1">
          <q-form class="q-gutter-md q-ma-md">
            <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
                <div class="animated-body" v-show="show">
                  <q-input class="text-bold input-style q-pa-sm" v-model="form.fullName" label="Nombre Completo" dense borderless
                  :error-message="formError.fullName" :error="$v.form.fullName.$error" @blur="$v.form.fullName.$touch()"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" color="primary"></q-icon>
                    </template>
                  </q-input>
                </div>
              </animation-transition>
              <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
                <div class="animated-body" v-show="show">
                  <q-input class="text-bold input-style q-pa-sm" type="email" v-model="form.email" label="Correo electrónico" dense borderless
                    :error-message="formError.email" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"
                  >
                    <template v-slot:prepend>
                      <q-icon name="mail" color="primary"></q-icon>
                    </template>
                  </q-input>
                </div>
              </animation-transition>
              <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
                <div class="animated-body" v-show="show">
                  <q-input class="text-bold input-style q-pa-sm" type="password" v-model="password" label="Contraseña" dense borderless
                    :error-message="'Ingrese un Email Valido'" :error="$v.password.$error" @blur="$v.password.$touch()"
                  >
                    <template v-slot:prepend>
                      <q-icon name="vpn_key" color="primary"></q-icon>
                    </template>
                  </q-input>
                </div>
              </animation-transition>
              <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
                <div class="animated-body" v-show="show">
                  <q-input class="text-bold input-style q-pa-sm" type="password" v-model="repeatPassword" label="Repita su Contraseña" dense borderless
                    :error-message="formError.repeatPassword" :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()"
                  >
                    <template v-slot:prepend>
                      <q-icon name="vpn_key" color="primary"></q-icon>
                    </template>
                  </q-input>
                </div>
              </animation-transition>
              <div class="column">
                <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
                  <div class="col full-width" v-show="show">
                    <q-btn class="shadow-3 full-width" push color="primary" label="Siguiente" glossy @click="next()" />
                  </div>
                </animation-transition>
                <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
                  <div class="col full-width q-mt-sm" v-show="show">
                    <q-btn @click="$router.go(-1)" class="shadow-3" color="grey" label="Volver" icon="keyboard_backspace" />
                  </div>
                </animation-transition>
              </div>
          </q-form>
        </q-card-section>
      </q-card>
      <q-dialog v-model="planDialog">
        <planes />
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>
<script>
import {AnimationVueTransition, AnimationVueTransitionType} from 'vue-animation'
import { required, sameAs, minLength, maxLength, email } from 'vuelidate/lib/validators'
import Planes from '../components/Planes'
export default {
  components: {
    [AnimationVueTransition.name]: AnimationVueTransition,
    Planes
  },
  data () {
    return {
      form: {
        fullName: ''
      },
      password: '',
      repeatPassword: '',
      formError: {},
      AnimationType: AnimationVueTransitionType,
      show: false,
      planDialog: false,
      pasoN: 1
    }
  },
  validations: {
    form: {
      fullName: { required, maxLength: maxLength(50), minLength: minLength(4) },
      email: { required, email }
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
      if (!this.validateErrors()) {
        this.form.password = this.password
        this.$api.post('register', this.form).then(res => {
          if (res) {
            this.$router.push('/')
            this.$q.notify({
              message: 'Ya formas parte de thot20',
              color: 'positive'
            })
          }
        })
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
    },
    async next () {
      this.$v.$touch()
      if (!this.validateErrors() && !await this.validateExistMail()) {
        this.form.password = this.password
        this.planDialog = true
      }
    },
    async validateExistMail() {
      var error = false
      await this.$api.get('validate_email_exist/' + this.form.email).then(res => {
        // console.log(res, 'res validate email')
        if (res) {
          error = false
        } else { error = true }
      })
      return error
    }
  }
}
</script>
