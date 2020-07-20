<template>
  <q-card class="full-width">
    <q-card-section>
      <div class="text-h6 text-primary">Olvide Mi Contraseña</div>
      <p class="text-primary">Ingrese Email con el que se registro en thot20, se le enviara un link para el cambio de contraseña</p>
      <q-input class="full-width" label="Ingrese su Email" v-model="form.email" />
    </q-card-section>
    <q-card-actions align="center">
      <q-btn label="Enviar Email de Recuperación" @click="onSubmit()" class="full-width" color="primary" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
     form: {
       email: ''
     }
    }
  },
  methods: {
    async onSubmit () {
      this.$q.loading.show()
      await this.$api.post('forgot_password', this.form).then(res => {
        console.log(res, 'resssss forgot password')
        if (res) {
          if (!res.error) {
            this.$q.notify({
              message: res.message,
              color: 'positive',
              type: 'positive'
            })
            this.$router.push('verificacion_codigo/' + this.form.email)
          } else {
            this.$q.notify({
              message: res.message,
              color: 'negative',
              type: 'negative'
            })
          }
        } else {
          this.$q.notify({
            message: res.message,
            color: 'negative',
            type: 'negative'
          })
        }
      })
      this.$q.loading.hide()
    }
  }
}
</script>

<style>

</style>
