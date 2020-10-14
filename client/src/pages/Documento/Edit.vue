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
          <q-breadcrumbs-el label="Edita tu Archivo" />
        </q-breadcrumbs>
      </div>
    </animation-transition>
    <q-card class="shadow-3 q-pa-md q-ml-md q-mr-md q-mt-lg card-border" bordered>
      <div class="q-pa-sm row justify-center">
        <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-sm q-pr-sm">
            <q-input v-model="form.name" label="Nombre del Documento" class="input-style q-pa-sm" dense borderless v-show="show"
              :error-message="errorMsg.name" :error="$v.form.name.$error"
            />
          </div>
        </animation-transition>
        <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-sm q-pr-sm">
            <q-input v-model="form.label" label="Etiqueta del Documento" class="input-style q-pa-sm" dense borderless v-show="show"
              :error-message="errorMsg.label" :error="$v.form.label.$error"
            />
          </div>
        </animation-transition>
        <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-sm q-pr-sm">
            <q-select label="Ingrese el/los Correo/s" v-model="form.emails" use-input use-chips multiple
              hide-dropdown-icon input-debounce="0" new-value-mode="add-unique" v-show="show"
              :error-message="errorMsg.emails" :error="$v.form.emails.$error"
              class="input-style q-pa-sm" dense borderless
            >
              <template v-slot:append>
                <q-btn icon="add" color="primary" round @click="addEmailShow = true" dense  />
              </template>
            </q-select>
          </div>
        </animation-transition>
        <q-dialog v-model="addEmailShow">
          <q-card class="window-width" >
            <q-form @submit="addEmail" >
              <q-card-section>
                  <q-input v-model="email" label="Email *" lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Ingrese Su Correo']"
                    class="input-style q-pa-sm" dense borderless
                  />
              </q-card-section>
              <q-card-actions align="right" >
                <q-btn color="primary" flat label="Cancelar" v-close-popup @click="this.email = ''" />
                <q-btn color="primary" label="Agregar" type="submit"/>
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
        <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-sm q-pr-sm">
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
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-sm q-pr-sm">
            <q-input v-model="form.archiveName" label="Nombre del Archivo" v-show="show" readonly autogrow class="input-style q-pa-sm" dense borderless
            />
          </div>
        </animation-transition>
        <q-dialog v-model="editarShow">
          <q-card class="full-width">
            <q-card-section>
              <div class="text-h6" >Sube tu Archivo</div>
              <p >Ten en cuenta que al subir un archivo se reemplazara por el nuevo</p>
            </q-card-section>
            <q-card-section>
              <q-file bottom-slots v-model="file" label="Subir Archivo" :error-message="errorMsg.file"
                class="input-style q-pa-sm" dense borderless :error="$v.file.$error"
              >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" color="primary" @click.stop />
                </template>
                <template v-slot:append>
                  <q-icon name="close" color="negative" @click.stop="model = null" class="cursor-pointer" />
                </template>
              </q-file>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn color="primary" label="Cancelar" outline @click="editarShow = false" v-close-popup />
              <q-btn color="primary" label="Aceptar" @click="editar = true" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
        <p v-show="show" align="center" class="q-pb-md"><a
            class="text-bold text-primary"
            @click="editarShow = true"
          >Click aqui para Cambiar el Archivo</a></p>
      </animation-transition>
      <div class="row justify-center">
        <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
          <q-btn class="q-pa-sm" glossy color="primary" label="Guardar" icon="backup" style="width:150px; border-radius:15px" v-show="show" @click="onSubmit()"/>
        </animation-transition>
      </div>
    </q-card>
  </div>
</template>

<script>
import env from '../../env'
import {AnimationVueTransition, AnimationVueTransitionType} from 'vue-animation'
import { required, requiredIf } from 'vuelidate/lib/validators'
export default {
  components: {
    [AnimationVueTransition.name]: AnimationVueTransition,
  },
  data () {
    return {
      form: {},
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
      email: '',
      editar: false,
      editarShow: false
    }
  },
  mounted () {
    this.$q.loading.show({
      message: 'Guardando Sus Datos'
    })
    this.show = true
    this.baseu = env.apiUrl
    this.getRecord(this.$route.params.id)
    this.$q.loading.hide()
  },
  validations: {
    form: {
      name: { required },
      label: { required },
      emails: { required },
      expiration: { required }
    },
    file: {
      required: requiredIf(function (editarf) {
        return this.editar
      })
    }
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
          await this.$api.put(`archives/${this.form._id}/0`, formData, {
            headers: {
              'Content-Type': undefined
            }
          }).then((res) => {
            if (res) {
              this.$router.push('/home')
            }
          })
        } else {
          let formData = new FormData()
          formData.append('dat', JSON.stringify(this.form))
          this.$api.put(`archives/${this.form._id}/1`, formData ).then(res => {
            if (res) {
              this.$q.notify({
                message: 'Guardado de Forma Exitosa',
                color: 'positive',
                type: 'positive'
              })
              this.$router.push('/home')
            }
            console.log('res: ', res)
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
      if (this.$v.form.$error) {
        error = true
        this.$q.notify({
          message: 'Todos Los Campos Son Requeridos Para Subir Tu Archivo',
          color: 'negative'
        })
      }
      return error
    },
    getRecord (id) {
      this.$q.loading.show({
        message: 'Cargando...'
      })
      this.$api.get('show_file/' + id ).then(res => {
        if (res) {
          this.form = res
          /* this.$api.get('get_file/' + this.form.archiveName ).then(fileget => {
            console.log(fileget, 'filleee')
          }) */
        }
      })
      this.$q.loading.hide()
    },
  }
}
</script>

<style>
</style>
