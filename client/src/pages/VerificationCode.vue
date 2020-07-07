<template>
  <q-layout class="fondo">
    <q-page-container>
      <q-card class="absolute-center q-pa-sm" style="width:95%">
        <q-card-section>
          <div class="text-primary text-h6">Ingrese el Codigo enviado a su correo electronico</div>
          <q-input label="Ingrese el Codigo" type="number" v-model="form.code" />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn class="full-width" color="primary" @click="onSubmit()" label="Verificar" />
        </q-card-actions>
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      form: {}
    }
  },
  methods: {
    async onSubmit () {
      this.$q.loading.show()
      this.form.email = this.$route.params.email
      await this.$api.post('verify_code', this.form).then(res => {
        console.log(res, 'resssss forgot password')
        if (res) {
          if (!res.error) {
            this.$q.notify({
              message: res.message,
              color: 'positive',
              type: 'positive'
            })
            this.$router.push('/change_password/' + this.form.email)
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

<style lang="scss" scoped>

</style>
