<template>
  <q-layout class="fondo">
    <q-page-container>
      <q-card class="absolute-center q-pa-sm" style="width:95%">
        <q-card-section>
          <div class="text-h6 text-primary">Recuperación de Contraseña</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <q-input v-model="newPassword" :type="isPwd ? 'password' : 'text'" label="Ingrese su Nueva Contraseña" :error-message="formError.newPassword" :error="$v.newPassword.$error" >  
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input v-model="repeatPassword" :type="isPwd ? 'password' : 'text'" label="Repita su Nueva Contraseña" :error-message="formError.repeatPassword" :error="$v.repeatPassword.$error" >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="primary" label="Guardar" @click="onSubmit()" class="full-width" />
        </q-card-actions>
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script>
import { required, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {},
      newPassword: '',
      repeatPassword: '',
      formError: {
        repeatPassword: '',
        newPassword: ''
      },
      isPwd: true
    }
  },
  validations: {
    repeatPassword: {
      sameAsPassword: sameAs('newPassword')
    },
    newPassword: { required, maxLength: maxLength(256), minLength: minLength(8) }
  },
  methods: {
    async onSubmit() {
      this.$q.loading.show()
      if (!this.validateErrors()) {
        this.form.email = this.$route.params.email
        this.form.newPassword = this.newPassword
        await this.$api.put('change_password', this.form).then(res => {
          console.log(res, 'resssss forgot password')
          if (res) {
            this.$q.notify({
              message: res.message,
              color: 'positive',
              type: 'positive'
            })
            this.$router.push('/')
          }
        })
      }
      this.$q.loading.hide()
    },
    validateErrors () {
      let error = false
      this.$v.$touch()
      if (this.$v.newPassword.$error || this.$v.repeatPassword.$error) {
        error = true
        this.formError.newPassword = this.newPassword.length < 7 ? 'la Contraseña debe ser mayor a 7 caracteres' : this.newPassword.length > 256 ? 'la contraseña no puede ser tan larga' : 'Ingrese su Contraseña'
        this.formError.repeatPassword = 'Las Contraseñas no Coinciden'
      }
      return error
    }
  }
}
</script>

<style>

</style>
