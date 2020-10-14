<template>
  <div>
    <animation-transition :animation-in-type="AnimationType.BOUNCEINDOWN" :animation-out-type="AnimationType.ROLLOUT">
      <div class="row q-mt-xl q-mr-lg">
        <div class="row">
          <q-btn color="grey" @click="$router.go(-1)" icon="keyboard_backspace" round dense class="q-ml-md" />
          <div class="row items-center q-ml-sm text-grey">Volver</div>
        </div>
        <q-space />
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Home" icon="home" />
          <q-breadcrumbs-el label="Enviar Archivos" />
        </q-breadcrumbs>
      </div>
    </animation-transition>
    <q-card class="shadow-3 q-pa-sm q-ma-md q-ml-sm q-mr-sm q-mt-lg card-border" bordered>
      <div class="q-pa-sm row justify-center">
        <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-sm q-pr-sm" v-show="show">
            <q-input v-model="form.name" label="Nombre del Documento" class="input-style q-pa-sm" dense borderless v-show="show"
              :error-message="errorMsg.name" :error="$v.form.name.$error"
            />
          </div>
        </animation-transition>
        <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-sm q-pr-sm" v-show="show">
            <q-input v-model="form.label" label="Etiqueta del Documento" class="input-style q-pa-sm" dense borderless v-show="show"
              :error-message="errorMsg.label" :error="$v.form.label.$error"
            />
          </div>
        </animation-transition>
        <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-sm q-pr-sm" v-show="show">
            <q-select
              label="Ingrese el/los Correo/s" v-model="form.emails" use-input use-chips multiple hide-dropdown-icon
              input-debounce="0" new-value-mode="add-unique" v-show="show" :error-message="errorMsg.emails"
              :error="$v.form.emails.$error" class="input-style q-pa-sm" dense borderless
            >
              <template v-slot:append>
                <q-btn icon="add" color="primary" dense round @click="addEmailShow = true" />
              </template>
            </q-select>
          </div>
        </animation-transition>
        <q-dialog v-model="addEmailShow">
          <q-card class="window-width" >
            <q-form @submit="addEmail" >
              <q-card-section>
                <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-sm q-pr-sm" v-show="show">
                  <q-input v-model="email" label="Email *" lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Ingrese Su Correo']"
                    class="input-style q-pa-sm" dense borderless
                  />
                </div>
              </q-card-section>
              <q-card-actions align="right" >
                <q-btn color="primary" flat label="Cancelar" v-close-popup @click="this.email = ''" />
                <q-btn color="primary" label="Agregar" type="submit"/>
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
        <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-sm q-pr-sm" v-show="show">
            <q-input v-show="show" v-model="form.expiration" class="input-style q-pa-sm" dense borderless>
              <template v-slot:prepend>
                <q-btn icon="event" class="cursor-pointer" color="primary" dense round>
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.expiration" mask="YYYY-MM-DD HH:mm:ss" />
                  </q-popup-proxy>
                </q-btn>
              </template>

              <template v-slot:append>
                <q-btn icon="access_time" class="cursor-pointer" color="primary" dense round>
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time v-model="form.expiration" mask="YYYY-MM-DD HH:mm:ss" format24h />
                  </q-popup-proxy>
                </q-btn>
              </template>
            </q-input>
          </div>
        </animation-transition>
        <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-sm q-pr-sm" v-show="show">
            <q-file bottom-slots v-model="file" label="Subir Archivo" v-show="show"
              :error-message="errorMsg.file" :error="$v.file.$error" class="input-style q-pa-sm" dense borderless>
              <template v-slot:prepend>
                <q-icon name="cloud_upload" color="primary" @click.stop />
              </template>
              <template v-slot:append>
                <q-icon name="close" color="negative" @click.stop="model = null" class="cursor-pointer" />
              </template>
            </q-file>
          </div>
        </animation-transition>
      </div>
      <div class="row justify-center">
        <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
          <q-btn class="glossy q-pa-sm q-mt-md" color="primary" label="Enviar" style="width:202px; border-radius:12px;
            height:50px" v-show="show" @click="onSubmit()"
          />
        </animation-transition>
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
              this.$q.loading.hide()
            } else if (res) {
              this.$router.push('/home')
              this.$q.loading.hide()
            }
          })
        }
      }
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
