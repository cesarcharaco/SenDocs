<template>
  <q-layout>
    <q-page-container class="fondo">
      <q-page class="row justify-center">
        <div class="col column items-center justify-center">
          <animation-transition :animation-in-type="AnimationType.BOUNCEINDOWN" :animation-out-type="AnimationType.ROLLOUT">
            <div class="row justify-center animated-body" v-show="show">
              <img
                src="../statics/Sen-Docs logo.png"
                alt="Logo EiCash"
                style="width: 40%;"
              >
            </div>
          </animation-transition>
          <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
          <div
            class="text-h6 text-white animated-body" v-show="show"
            style="text-align: center"
          >Iniciar Sesión</div>
          </animation-transition>
          <q-form
            @submit="onSubmit"
            class="q-gutter-md q-ma-md"
          >
          <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
            <div class="animated-body" v-show="show">
              <q-input
                class="q-ma-sm text-bold"
                type="email"
                dark
                v-model="form.email"
                label="Correo electrónico"
              >
                <template v-slot:prepend>
                  <q-icon name="mail"></q-icon>
                </template>
              </q-input>
            </div>
          </animation-transition>
          <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
            <div class="animated-body" v-show="show">
                <q-input
                  class="q-ma-sm text-bold"
                  :type="isPwd ? 'password' : 'text'"
                  v-model="form.password"
                  label="Contraseña"
                  dark
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
              </div>
          </animation-transition>
          <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
            <div class="text-center q-ma-sm animated-body" v-show="show">
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
          </animation-transition>
          <animation-transition :animation-in-type="AnimationType.BOUNCEINUP" :animation-out-type="AnimationType.ROLLOUT">
          <div class="animated-body" v-show="show">
            <p align="center" v-if="registro"><a
                style="color: blue"
                class="text-bold"
                @click="$router.push('registro')"
              >¿Eres nuevo? Regístrate.</a></p>
            <p
              align="center"
              class="gray text-bold"
              @click="recoveryShow = true"
            >¿Olvidaste la contraseña?</p>
          </div>
          </animation-transition>
          </q-form>
          <animation-transition :animation-in-type="AnimationType.BOUNCEINUP" :animation-out-type="AnimationType.ROLLOUT">
          <div class="footer gray text-bold animated-body" v-show="show">
            <p>Un Proyecto EICHE</p>
          </div>
          </animation-transition>
        </div>
      </q-page>
    </q-page-container>
    <q-dialog v-model="recoveryShow">
      <recover-password />
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapMutations } from 'vuex'
import RecoverPassword from '../components/RecoverPassword'
import {AnimationVueTransition, AnimationVueTransitionType} from 'vue-animation'
export default {
  components: {
    [AnimationVueTransition.name]: AnimationVueTransition,
    RecoverPassword
  },
  data () {
    return {
      form: {},
      registro: false,
      recoveryShow: false,
      isPwd: true,
      loading: false,
      AnimationType: AnimationVueTransitionType,
      show: false
    }
  },
  mounted () {
    this.show = true
  },
  methods: {
    ...mapMutations('generals', ['login']),
    onSubmit () {
      this.$q.loading.show({
        message: 'Iniciando sesión'
      })
      this.$api.post('login', this.form).then(res => {
        if (res) {
          const client = res.SD_SESSION_INFO.roles.find(value => value === 1)
          if (client) {
            this.login(res)
            this.$router.push('home')
          } else {
            this.login(res)
            this.$router.push('dashboard')
          }
        } else {
          console.log('hubo un error')
        }
      })
      this.$q.loading.hide()
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
  color: rgb(0, 0, 0);
}
</style>
