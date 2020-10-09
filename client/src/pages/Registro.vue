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
          <q-form class="q-gutter-md">
            <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
                <div class="animated-body" v-show="show">
                  <q-input class="text-bold input-style q-pa-sm" v-model="form.name" label="Nombre" dense borderless
                  :error-message="formError.name" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" color="primary"></q-icon>
                    </template>
                  </q-input>
                </div>
              </animation-transition>
              <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
                <div class="animated-body" v-show="show">
                  <q-input class="text-bold input-style q-pa-sm" v-model="form.lastName" label="Apellido" dense borderless
                  :error-message="formError.lastName" :error="$v.form.lastName.$error" @blur="$v.form.lastName.$touch()"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" color="primary"></q-icon>
                    </template>
                  </q-input>
                </div>
              </animation-transition>
              <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
                <div class="animated-body" v-show="show">
                  <q-select class="text-bold input-style q-pa-sm" v-model="form.sex" label="Sexo" dense borderless :options="['Masculino', 'Femenino']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" color="primary"></q-icon>
                    </template>
                  </q-select>
                </div>
              </animation-transition>
              <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
                <div class="animated-body" v-show="show">
                  <q-input class="text-bold input-style q-pa-sm" v-model="form.birthdate" label="Fecha de Nacimiento" dense borderless type="date" stack-label
                  >
                    <template v-slot:prepend>
                      <q-icon name="event" color="primary"></q-icon>
                    </template>
                  </q-input>
                </div>
              </animation-transition>
              <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
                <div class="animated-body" v-show="show">
                  <q-input class="text-bold input-style q-pa-sm" v-model="form.placeLive" label="Lugar donde Vives" dense borderless
                  >
                    <template v-slot:prepend>
                      <q-icon name="home" color="primary"></q-icon>
                    </template>
                  </q-input>
                </div>
              </animation-transition>
              <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
                <div class="animated-body" v-show="show">
                  <q-input class="text-bold input-style q-pa-sm" v-model="form.address" label="Dirección" dense borderless
                  >
                    <template v-slot:prepend>
                      <q-icon name="swap_calls" color="primary"></q-icon>
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
              <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
                <div class="animated-body" v-show="show">
                  <q-input class="text-bold input-style q-pa-sm" type="email" v-model="form.emailRecuperate" label="Correo electrónico de Recuperacion" dense borderless
                    :error-message="formError.emailRecuperate" :error="$v.form.emailRecuperate.$error" @blur="$v.form.emailRecuperate.$touch()"
                  >
                    <template v-slot:prepend>
                      <q-icon name="mail" color="primary"></q-icon>
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
        <q-card-section v-if="pasoN === 2">
          <animation-transition :animation-in-type="AnimationType.BOUNCEINDOWN" :animation-out-type="AnimationType.ROLLOUT">
            <planes :form="form" v-show="show_plan" />
          </animation-transition>
        </q-card-section>
      </q-card>
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
        name: '',
        lastName: '',
        sex: ''
      },
      password: '',
      repeatPassword: '',
      formError: {},
      AnimationType: AnimationVueTransitionType,
      show: false,
      show_plan: false,
      pasoN: 1
    }
  },
  validations: {
    form: {
      name: { required, maxLength: maxLength(50), minLength: minLength(4) },
      lastName: { required, maxLength: maxLength(50), minLength: minLength(4) },
      email: { required, email },
      emailRecuperate: { required, email }
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
    async onSubmit () {
      this.$q.loading.show()
      this.form.password = this.password
      await this.$api.post('register', this.form).then(res => {
        if (res) {
          this.$router.push('/')
          this.$q.notify({
            message: 'Ya formas parte de thot20',
            color: 'positive'
          })
        }
      })
      this.$q.loading.hide()
    },
    validateErrors () {
      let error = false
      if (this.$v.form.$error || this.$v.password.$error || this.$v.repeatPassword.$error) {
        error = true
        this.formError.name = this.form.name.length < 2 ? 'Debe ser mayor a 2 caracteres' : this.form.name.length > 50 ? 'Debe ser menor a 50 caracteres' : 'Ingrese su Nombre'
        this.formError.lastName = this.form.lastName.length < 2 ? 'Debe ser mayor a 2 caracteres' : this.form.lastName.length > 50 ? 'Ddebe ser menor a 50 caracteres' : 'Ingrese su Apellido'
        this.formError.email = 'Ingrese su Email'
        this.formError.password = this.password.length < 7 ? 'la Contraseña debe ser mayor a 7 caracteres' : this.password.length > 256 ? 'la contraseña no puede ser tan larga' : 'Ingrese su Contraseña'
        this.formError.repeatPassword = 'Las Contraseñas no Coinciden'
        this.formError.emailRecuperate = 'Ingrese un Email de Recuperacion valido'
      }
      return error
    },
    async next () {
      this.$q.loading.show()
      this.$v.$touch()
      if (!this.validateErrors() && !await this.validateExistMail()) {
        this.form.password = this.password
        this.pasoN = 2
        this.show_plan = true
      }
      this.$q.loading.hide()
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
