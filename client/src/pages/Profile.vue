<template>
  <q-card class="q-ma-sm q-pa-sm shadow-3">
    <q-card-section>
      <div class="text-h6 row justify-center">Tu Perfil</div>
    </q-card-section>
    <q-card-section>
      <div class="column items-center justify-center">
          <q-avatar size="140px" class="q-mb-lg">
            <q-img :src="img">

              <q-btn class="absolute-top-right all-pointer-events" size="xs" flat round icon="delete_forever"
                color="negative" @click="img_default" v-if="file" >
                <q-tooltip>
                  Eliminar
                </q-tooltip>
              </q-btn>
            </q-img>
          </q-avatar>
            <div class="col">
              <label class="boton_personalizado">Subir Foto
                <q-input v-model="file" @input="upload" @clear="img_default" type="file" borderless style="display:none"/>
              </label>
            </div>
          </div>
      <q-input type="email" label="Email" v-model="form.email" />
      <q-input label="Nombre completo" v-model="form.fullName" />
      <q-input label="Email de recuperacion" v-model="form.emailRecuperate" />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn label="volver" @click="$router.go(-1)" flat color="primary" style="border-radius:10px" />
      <q-btn label="Guardar" @click="onSubmit()" color="primary" style="border-radius:10px" />
    </q-card-actions>
  </q-card>
</template>

<script>
import env from '../env'
export default {
  data() {
    return {
      form: {},
      img: '../statics/sin_foto.png',
      file: '',
      baseu: ''
    }
  },
  mounted () {
    this.baseu = env.apiUrl
    this.getRecord()
  },
  methods: {
    getRecord () {
      this.$api.get('users_profile').then(res => {
        this.form = res
        if (this.form.img_name) { this.img = this.baseu + '/storage/uploads/' + this.form.img_name }
        console.log(res, 'resss profile')
      })
    },
    async onSubmit () {
      if (this.file[0]) {
        let formData = new FormData()
        formData.append('files', this.file[0])
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.post('upload_profile_image', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.form.img_name = res.name
        })
      }
      this.$api.put('users_profile', this.form).then(res => {
        if (res.error) {
          this.$q.notify({
            message: res.message,
            color: 'negative',
            type: 'negative'
          })
        } else if (res) {
          this.$q.notify({
            message: 'Datos Guardados Exitosamente',
            color: 'positive',
            type: 'positive'
          })
          this.$router.go(-1)
        }
      })
    },
    img_default () {
      this.img = '../statics/sin_foto.png'
      this.file = ''
    },
    async upload () {
      if (this.file) { this.img = URL.createObjectURL(this.file[0]) }
    }
  }
}
</script>

<style>
.boton_personalizado {
  text-decoration: none;
  padding: 6px;
  font-weight: 540;
  font-size: 15px;
  color: #ffffff;
  background-color: #054632;
  border-radius: 6px;
  border: 2px solid #000000;
}
.boton_personalizado:hover {
  color: #ffffff;
  background-color: #033d25;
}
</style>
