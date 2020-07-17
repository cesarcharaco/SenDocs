<template>
  <div>
    <animation-transition :animation-in-type="AnimationType.BOUNCEINDOWN" :animation-out-type="AnimationType.ROLLOUT">
      <q-item-label header class="text-bold" v-show="show">Sube tu Archivo</q-item-label>
    </animation-transition>
    <q-card class="shadow-3 q-pa-md q-ma-sm" bordered>
      <div class="q-pa-sm">
        <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
          <q-input
            v-model="form.name"
            label="Nombre del Documento"
            v-show="show"
            :error-message="errorMsg.name"
            :error="$v.form.name.$error"
          />
        </animation-transition>
        <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
          <q-input
            v-model="form.label"
            label="Etiqueta del Documento"
            v-show="show"
            :error-message="errorMsg.label"
            :error="$v.form.label.$error"
          />
        </animation-transition>
        <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
          <q-select label="Ingrese el/los Correo/s" v-model="form.emails" use-input use-chips multiple hide-dropdown-icon input-debounce="0" new-value-mode="add-unique" v-show="show" :error-message="errorMsg.emails" :error="$v.form.emails.$error" >
            <template v-slot:append>
              <q-btn icon="add" color="primary" flat round @click="addEmailShow = true" />
            </template>
          </q-select>
        </animation-transition>
        <q-dialog v-model="addEmailShow">
          <q-card class="window-width" >
            <q-form @submit="addEmail" >
              <q-card-section>
                  <q-input v-model="email" label="Email *" lazy-rules :rules="[ val => val && val.length > 0 || 'Ingrese Su Correo']" />
              </q-card-section>
              <q-card-actions align="right" >
                <q-btn color="primary" flat label="Cancelar" v-close-popup @click="this.email = ''" />
                <q-btn color="primary" label="Agregar" type="submit"/>
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
        <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
          <q-input v-show="show" v-model="form.expiration">
            <template v-slot:prepend>
              <q-btn icon="event" class="cursor-pointer" color="primary" flat round>
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.expiration" mask="YYYY-MM-DD HH:mm:ss" />
                </q-popup-proxy>
              </q-btn>
            </template>

            <template v-slot:append>
              <q-btn icon="access_time" class="cursor-pointer" color="primary" flat round>
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="form.expiration" mask="YYYY-MM-DD HH:mm:ss" format24h />
                </q-popup-proxy>
              </q-btn>
            </template>
          </q-input>
        </animation-transition>
        <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
          <q-file bottom-slots v-model="file" label="Subir Archivo" v-show="show" counter :error-message="errorMsg.file" :error="$v.file.$error" >
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
              icon="backup"
              style="width:150px; border-radius:25px"
              v-show="show"
              @click="onSubmit()"
            />
          </animation-transition>
        </q-card-actions>
      </div>
    </q-card>
  </div>
</template>

<script>
import env from '../../env'
import {AnimationVueTransition, AnimationVueTransitionType} from 'vue-animation'
import { required } from 'vuelidate/lib/validators'
export default {
  components: {
    [AnimationVueTransition.name]: AnimationVueTransition,
  },
  data () {
    return {
      form: {
        emails: [],
        name: '',
        label: '',
        expiration: null
      },
      errorMsg: {
        name: 'Error en el Nombre',
        label: 'Error en la Etiqueta',
        emails: 'Error en el Email',
        expiration: 'Error en la Fecha de Expiracion',
        file: 'Error en el Archivo'
      },
      AnimationType: AnimationVueTransitionType,
      show: false,
      file: null,
      baseu: '',
      addEmailShow: false,
      email: ''
    }
  },
  mounted () {
    this.show = true
    this.baseu = env.apiUrl
  },
  validations: {
    form: {
      name: { required },
      label: { required },
      emails: { required },
      expiration: { required }
    },
    file: { required }
  },
  methods: {
    async onSubmit () {
      this.$q.loading.show({
        message: 'Guardando Sus Datos'
      })
      if (!this.validarError()) {
        if (this.file) {
          let formData = new FormData()
          formData.append('files', this.file)
          formData.append('dat', JSON.stringify(this.form))
          console.log(formData, 'formdata')
          await this.$api.post('uploads', formData, {
            headers: {
              'Content-Type': undefined
            }
          }).then((res) => {
            console.log(res,'RESSSSSSSSSSS AQUI DEL SUBIR ARCHIVOS')
            if (res.error) {
              this.$q.notify({
                message: res.msg,
                color: 'warning',
                type: 'negative'
              })
            } else if (res) {
              this.$router.push('/home')
            }
          })
        }
      }
      this.$q.loading.hide()
    },
    addEmail () {
      this.form.emails.push(this.email)
      this.email = ''
      this.addEmailShow = false
    },
    validarError () {
      let error = false
      this.$v.$touch()
      if (this.$v.form.$error || this.$v.file.$error ) {
        error = true
        this.$q.notify({
          message: 'Todos Los Campos Son Requeridos Para Subir Tu Archivo',
          color: 'negative'
        })
      }
      return error
    }
  }
}
</script>

<style>
</style>
