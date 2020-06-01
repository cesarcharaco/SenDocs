<template>
  <q-layout>
    <q-page-container class="fondo">
      <q-page class="row justify-center">
        <div class="col column items-center justify-center">
          <img
            src="../statics/Sen-Docs logo.png"
            alt="Logo EiCash"
            style="width: 40%;"
          >
          <div
            class="text-h6"
            style="text-align: center"
          >Iniciar Sesión</div>
          <q-form
            @submit="onSubmit"
            class="q-gutter-md q-ma-md"
          >
            <q-input
              class="q-ma-sm"
              type="email"
              v-model="form.email"
              label="Correo electrónico"
            >
              <template v-slot:prepend>
                <q-icon name="mail"></q-icon>
              </template>
            </q-input>

            <q-input
              class="q-ma-sm"
              :type="isPwd ? 'password' : 'text'"
              v-model="form.password"
              label="Contraseña"
            >
              <template v-slot:prepend>
                <q-icon name="vpn_key"></q-icon>
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  color="primary"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div class="text-center q-ma-sm">
              <q-btn
                push
                color="primary"
                class="full-width q-mr-sm"
                icon="ion-return-right"
                :loading="loading"
                type="submit"
              >Ingresar
                <template v-slot:loading>
                  <q-spinner-hourglass class="on-left" />
                  Cargando...
                </template>
              </q-btn>
            </div>
            <p align="center"><a
                href=""
                style="color: cornflowerblue"
              >¿Eres nuevo? Regístrate</a></p>
            <p
              align="center"
              class="gray"
            >¿Olvidaste la contraseña?</p>
          </q-form>
          <div class="footer gray">
            <p>Términos de uso - Avisos de privacidad - Ayuda</p>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      form: {},
      isPwd: true,
      loading: false
    }
  },
  mounted () {
  },
  methods: {
    ...mapMutations('generals', ['login']),
    onSubmit () {
     // this.loading = true
      this.$api.get('hola').then(res => {
        console.log(res)
      })
      this.$api.post('login', this.form).then(res => {
        console.log(res)
      })

    }
  }
}
</script>
<style lang="css" scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
.gray {
  color: darkslategray;
}
</style>
