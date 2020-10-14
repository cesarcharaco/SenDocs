<template>
  <div>
    <q-card class="shadow-2 card-border q-ma-md q-pt-md">
      <div class="q-ml-md q-mt-sm text-h6 text-grey-9">Crear Usuario</div>
      <q-card-section>
        <div class="q-pa-md row justify-center">
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-sm q-pr-sm" v-show="show">
            <q-input class="text-bold input-style q-pa-sm" v-model="form.name" label="Nombre" dense borderless
            :error-message="formError.name" :error="$v.form.name.$error" @blur="$v.form.name.$touch()" >
              <template v-slot:prepend>
                <q-icon name="person" color="primary"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-sm q-pr-sm" v-show="show">
            <q-input class="text-bold input-style q-pa-sm" v-model="form.lastName" label="Apellido" dense borderless
            :error-message="formError.lastName" :error="$v.form.lastName.$error" @blur="$v.form.lastName.$touch()" >
              <template v-slot:prepend>
                <q-icon name="person" color="primary"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-sm q-pr-sm" v-show="show">
            <q-input class="text-bold input-style q-pa-sm" type="email" v-model="form.email" label="Correo electrónico" dense borderless
              :error-message="formError.email" :error="$v.form.email.$error" @blur="$v.form.email.$touch()" >
              <template v-slot:prepend>
                <q-icon name="mail" color="primary"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-sm q-pr-sm" v-show="show">
            <q-input class="text-bold input-style q-pa-sm" type="password" v-model="password" label="Contraseña" dense borderless
              :error-message="'Ingrese un Email Valido'" :error="$v.password.$error" @blur="$v.password.$touch()">
              <template v-slot:prepend>
                <q-icon name="vpn_key" color="primary"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-sm q-pr-sm" v-show="show">
            <q-input class="text-bold input-style q-pa-sm" type="password" v-model="repeatPassword" label="Repita su Contraseña" dense borderless
              :error-message="formError.repeatPassword" :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()" >
              <template v-slot:prepend>
                <q-icon name="vpn_key" color="primary"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-sm q-pr-sm" v-show="show">
            <q-input class="text-bold input-style q-pa-sm" type="email" v-model="form.emailRecuperate" label="Correo electrónico de Recuperacion" dense borderless
              :error-message="formError.emailRecuperate" :error="$v.form.emailRecuperate.$error" @blur="$v.form.emailRecuperate.$touch()" >
              <template v-slot:prepend>
                <q-icon name="mail" color="primary"></q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <div class="text-grey-9 text-h6">Seleccione el plan</div>
        <q-list bordered style="border-radius:12px">
          <q-item tag="label" v-for="(plan, index) in planes" :key="index" v-ripple clickable @click="selectPrice(plan.name)">
            <q-item-section side top>
              <q-radio v-model="selectPlan" :val="plan.name" @input="selectPrice(plan.name)"/>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">{{plan.name}}</q-item-label>
              <q-item-label caption>{{plan.description}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn @click="$router.go(-1)" class="shadow-3" color="grey" label="Volver" icon="keyboard_backspace" />
        <q-space />
        <q-btn class="shadow-3" push color="primary" label="Registrar" glossy @click="registrar()" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { required, sameAs, minLength, maxLength, email } from 'vuelidate/lib/validators'
import {AnimationVueTransition, AnimationVueTransitionType} from 'vue-animation'
import moment from 'moment'
export default {
  components: {
    [AnimationVueTransition.name]: AnimationVueTransition
  },
 data () {
   return {
     show: false,
     form: {
       name: '',
       lastName: ''
     },
     formError: {},
     password: '',
     repeatPassword: '',
     selectPlan: 'Plan 2',
     planes: [
        /* {
          name: 'Plan 1',
          description: 'Plan Gratis, que Incluye 3 dias gratis y un almacenamiento de 1 GB y una cantidad de 5 archivos',
          storage: 1073741824, // establecido en Bytesbytes Equivalente a 1GB
          fileLimit: 5, // limite de archivos que puede subir
          days: 3,
          price: 0
        }, */
        {
          name: 'Plan 2',
          description: 'Plan 2, que Incluye un tiempo total de 1 año y un almacenamiento de 1 GB y una cantidad de 25 archivos',
          storage: 1073741824, // establecido en Bytesbytes EQUIVALENTE A 1GB
          fileLimit: 25, // limite de archivos que puede subir
          days: 365,
          price: 1,
          created_at: ''
        },
        {
          name: 'Plan 3',
          description: 'Plan 3 que Incluye un tiempo total de 1 año y un almacenamiento de 5 GB y una cantidad de 100 archivos',
          storage: 5368709120, // establecido en Bytesbytes EQUIVALENTE A 5GB
          fileLimit: 100, // limite de archivos que puede subir
          days: 365,
          price: 1,
          created_at: ''
        },
        {
          name: 'Plan 4',
          description: 'Plan 4 que Incluye un tiempo total de 1 año y un almacenamiento de 15 GB y una cantidad ilimitada de archivos',
          storage: 16106127360, // establecido en Bytesbytes EQUIVALENTE A 15GB
          days: 365,
          fileLimit: 999999999, //  puede subir la cantidad que sea hasta cumplir el plazo de vencimiento del plan
          price: 1,
          created_at: ''
        },
        {
          name: 'Plan Gratis',
          description: 'Plan Gratis que Incluye un tiempo total de 1 año y un almacenamiento de 25 MB y una cantidad de 5 archivos',
          storage: 26214400, // establecido en Bytesbytes EQUIVALENTE A 25MB
          days: 365,
          fileLimit: 25,
          price: 0,
          created_at: ''
        }
      ]
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
   this.selectPrice('Plan 2')
   this.show = true
 },
 methods: {
   async registrar () {
    this.$q.loading.show()
    this.$v.$touch()
    if (!this.validateErrors() && !await this.validateExistMail()) {
      this.form.password = this.password
      await this.$api.post('create_user', this.form).then(res => {
        if (res) {
          this.$router.go(-1)
          this.$q.notify({
            message: 'Ya el usuario forma parte de Thot20',
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
        this.formError.name = this.form.name.length < 2 ? 'Debe ser mayor a 2 caracteres' : this.form.name.length > 50 ? 'Debe ser menor a 50 caracteres' : 'Ingrese su Nombre'
        this.formError.lastName = this.form.lastName.length < 2 ? 'Debe ser mayor a 2 caracteres' : this.form.lastName.length > 50 ? 'Debe ser menor a 50 caracteres' : 'Ingrese su Apellido'
        this.formError.email = 'Ingrese su Email'
        this.formError.password = this.password.length < 7 ? 'la Contraseña debe ser mayor a 7 caracteres' : this.password.length > 256 ? 'la contraseña no puede ser tan larga' : 'Ingrese su Contraseña'
        this.formError.repeatPassword = 'Las Contraseñas no Coinciden'
        this.formError.emailRecuperate = 'Ingrese un Email de Recuperacion valido'
      }
      return error
    },
    async validateExistMail() {
      var error = false
      await this.$api.get('validate_email_exist/' + this.form.email).then(res => {
        if (res) {
          error = false
        } else { error = true }
      })
      return error
    },
    async selectPrice (plan_name) {
      this.selectPlan = plan_name
      let plan = this.planes.find(element => element.name === this.selectPlan)
      plan.created_at = moment().toDate()
      this.formPlan = plan
      this.form.plan = this.formPlan
      console.log(this.formPlan, 'formPlan', this.form, 'form')
    }
 }
}
</script>

<style>

</style>
