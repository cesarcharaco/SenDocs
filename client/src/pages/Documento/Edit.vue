<template>
  <div>
    <animation-transition :animation-in-type="AnimationType.BOUNCEINDOWN" :animation-out-type="AnimationType.ROLLOUT">
      <q-item-label header class="text-bold" v-show="show">Edita tu Archivo</q-item-label>
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
          <q-input
            v-model="form.expiration"
            mask="date"
            readonly
            :rules="['date']"
            label="Fecha de Vencimiento"
            v-show="show"
            :error-message="errorMsg.expiration"
            :error="$v.form.expiration.$error"
          >
            <template v-slot:append>
              <q-btn
                icon="event"
                color="primary"
                class="q-mr-md"
                round
                flat
              >
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="form.expiration"
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-btn>
            </template>
          </q-input>
        </animation-transition>
        <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
          <q-input
            v-model="form.archiveName"
            hint="Este es el Nombre del Archivo en Base de Datos"
            label="Nombre del Archivo"
            v-show="show"
            readonly
            autogrow
          />
        </animation-transition>
        <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
            <p v-show="show" align="center" class="q-pa-lg"><a
                style="color: blue"
                class="text-bold"
                @click="editarShow = true"
              >Click aqui para Cambiar el Archivo</a></p>
        </animation-transition>
        <q-dialog v-model="editarShow">
          <q-card class="full-width">
            <q-card-section>
              <div class="text-h6" >Sube tu Archivo</div>
              <p >Ten en cuenta que al subir un archivo se reemplazara por el nuevo</p>
            </q-card-section>
            <q-card-section>
              <q-file bottom-slots v-model="file" label="Subir Archivo" counter :error-message="errorMsg.file" :error="$v.file.$error" >
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
        <q-separator />
        <q-card-actions align="right">
          <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
            <q-btn
              class="glossy q-pa-sm q-mt-md"
              color="primary"
              label="Guardar"
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
                color: 'postive',
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
