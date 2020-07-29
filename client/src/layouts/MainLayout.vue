<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <animation-transition :animation-in-type="AnimationType.ZOOMIN" :animation-out-type="AnimationType.ROLLOUT">
          <div class="animated-body" v-show="show">
            <q-img src="statics/Sen-Docs logo 50x50.png" basic style="width:40px; height:40px" class="q-ma-sm" />
          </div>
        </animation-transition>
        <animation-transition :animation-in-type="AnimationType.ZOOMIN" :animation-out-type="AnimationType.ROLLOUT">
        <div class="absolute-top-right q-pa-sm animated-body" v-show="show">
                <q-btn flat dense icon="notifications" auto-close size="md" >
                  <q-badge color="red" floating transparent v-if="nNotify">{{nNotify}}</q-badge>
                  <q-menu transition-show="jump-down" transition-hide="jump-up" fit :offset="[0, 10]" anchor="bottom right"
                    self="top right" v-close-popup auto-close>
                    <q-item>
                      <q-item-section>
                        <q-item-label>Notificaciones</q-item-label>
                      </q-item-section>
                      <q-item-section side bottom >
                        <q-item-label caption>
                          <a class="cursor-pointer text-primary" @click="disableAllNotify()" primary>Marcar como Leidas</a>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-list>
                      <q-scroll-area style="height: 200px; max-width: 300px;">
                        <q-item v-for="(n, index) in myNotification" :key="index" clickable v-close-popup
                        :class="[n.seen?'bg-white':'bg-grey-4']" @click="disableNotify(n._id)"
                        >
                          <q-item-section push @click="disableNotify(n._id)" >
                            <q-item-label class="text-bold" ovequasrline>{{n.title}}</q-item-label>
                            <q-item-label lines="5" style="font-size:12px"> {{n.message}} </q-item-label>
                            <q-item-label caption>{{n.created_at}}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-scroll-area>
                    </q-list>
                  </q-menu>
                </q-btn>
                <q-btn flat dense icon="settings" auto-close size="md" >
                  <q-menu transition-show="jump-down" transition-hide="jump-up" fit :offset="[0, 10]"
                  anchor="bottom right" self="top right" v-close-popup auto-close >
                    <q-item clickable v-ripple @click="$router.push('/profile')" style="width:200px" class="text-primary">
                      <q-item-section avatar>
                        <q-icon color="primary" name="person" />
                      </q-item-section>
                      <q-item-section>Perfil</q-item-section>
                    </q-item>
                    <q-separator inset />
                    <q-item clickable v-ripple @click="cerrarSesion()" style="width:200px" class="text-primary">
                      <q-item-section avatar>
                        <q-icon color="primary" name="exit_to_app" />
                      </q-item-section>
                      <q-item-section>Cerrar Sesión</q-item-section>
                    </q-item>

                  </q-menu>
                </q-btn>
              </div>
              </animation-transition>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<script>
import Footer from '../components/Footer'
import {AnimationVueTransition, AnimationVueTransitionType} from 'vue-animation'
import { mapMutations } from 'vuex'
export default {
  name: 'MainLayout',
  components: {
    [AnimationVueTransition.name]: AnimationVueTransition,
  },
  data () {
    return {
      nNotify: 0,
      myNotification: [],
      AnimationType: AnimationVueTransitionType,
      show: false
    }
  },
  mounted () {
    this.show = true
    this.getNotification()
  },
  methods: {
    ...mapMutations('generals', ['logout']),
    cerrarSesion () {
      this.logout()
      this.$router.push('/')
    },
    async getNotification () {
      this.$api.get('notifications').then(res => {
        this.myNotification = res
        this.countNotify()
      })
    },
    disableAllNotify () {
      this.$api.put('notifications').then(res => {
        this.myNotification = res
        this.countNotify()
      })
    },
    countNotify () {
      for (let j in this.myNotification) {
          if (this.myNotification[j].seen === false) {
            this.nNotify = this.nNotify + 1
          }
        }
    },
    disableNotify (id) {
      this.$api.put('notification_disable/' + id).then(res => {
        this.getNotification()
      })
    },
  }
}
</script>
