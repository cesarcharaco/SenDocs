<template>
  <q-layout>
    <q-page-container class="fondo">
      <q-page class="row justify-center items-center">
        <q-card class="shadow-3 card-border q-ma-md">
          <q-card-section>
            <div class="col column items-center justify-center">
              <animation-transition :animation-in-type="AnimationType.BOUNCEINDOWN" :animation-out-type="AnimationType.ROLLOUT">
                <div class="row justify-center" v-show="show">
                  <img src="../statics/thot20.png" alt="Logo EiCash" style="width: 50%;">
                </div>
              </animation-transition>
              <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
                <div v-show="show">
                  <div class="text-h6 text-grey-10" style="text-align: center">THOT20</div>
                  <p class="text-grey-9">La manera mas facil de enviar tus archivos</p>
                </div>
              </animation-transition>
            </div>
            <q-form @submit="onSubmit" class="q-gutter-sm q-ma-sm">
              <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
                <div class="animated-body" v-show="show">
                  <q-input class="text-bold input-style q-pl-sm" type="email" v-model="form.email" label="Correo electrónico">
                    <template v-slot:prepend>
                      <q-icon color="primary" name="mail"></q-icon>
                    </template>
                  </q-input>
                </div>
              </animation-transition>
              <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
                <div class="animated-body" v-show="show">
                  <q-input class="text-bold input-style q-pl-sm q-pr-sm" :type="isPwd ? 'password' : 'text'" v-model="form.password" label="Contraseña">
                    <template v-slot:prepend>
                      <q-icon color="primary" name="vpn_key"></q-icon>
                    </template>
                    <template v-slot:append>
                      <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer" color="primary" @click="isPwd = !isPwd"/>
                    </template>
                  </q-input>
                </div>
              </animation-transition>
              <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
                <div class="text-center q-ma-sm animated-body" v-show="show">
                  <q-btn push color="primary" class="button-login q-mt-sm" label="Iniciar Sesion" :loading="loading" type="submit">
                    <template v-slot:loading>
                      <q-spinner-hourglass class="on-left" />
                      Cargando...
                    </template>
                  </q-btn>
                </div>
              </animation-transition>
              <q-separator inset class="q-mt-lg q-mb-lg" />
              <animation-transition :animation-in-type="AnimationType.BOUNCEINUP" :animation-out-type="AnimationType.ROLLOUT">
              <div class="animated-body" v-show="show">
                <p align="center" v-if="registro"><a class="text-bold text-primary" @click="$router.push('registro')">¿Eres nuevo? Regístrate.</a></p>
                <p align="center" class="text-grey-9" style="font-size:12px" @click="recoveryShow = true">
                  <label>¿Has Olvidado la contraseña? haz </label><label class="text-primary">click Aqui</label>
                </p>
              </div>
              </animation-transition>
            </q-form>
          </q-card-section>
        </q-card>
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
      registro: true,
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
