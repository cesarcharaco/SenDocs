<template>
  <!-- Nuevo proyecto -->
  <q-page class=" row bg-grey-1">
    <div class="col">
      <div class="q-pa-xs row items-start justify-between">
        <q-img
          src="statics/logo_quasar.png"
          alt=""
          style="width: 38px"
        ></q-img>
        <div>
          <q-btn
            flat
            round
            size="md"
            color="warning"
            icon="notifications"
          >
          </q-btn>
          <q-btn
            flat
            round
            size="md"
            color="dark"
            icon="settings"
          >
          </q-btn>
        </div>
      </div>
      <q-separator />
      <div class="q-pa-sm row items-start justify-start">
        <q-card
          class="bg-grey-1 my-card"
          style="width: 100%"
          flat
        >
          <q-card-section horizontal>
            <q-card-section class="col-4 flex flex-center">
              <q-avatar size="100px">
                <img src="statics/perfil.jpg">
              </q-avatar>
            </q-card-section>
            <q-card-section class="q-pt-xs">
              <div class="text-h6 q-mt-sm">Nombre Usuario</div>
              <div class="text-overline">Correo@Email.com</div>
              <div class="text-caption text-grey">Untima conexión</div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-pa-xs">
        <div class="q-gutter-xl row justify-center">
          <q-btn
            round
            size="lg"
            color="teal"
            icon="backup"
            to="/documento/subir"
          />
          <q-btn
            round
            size="lg"
            color="teal"
            icon="edit"
            to="/documento/editar"
          />
        </div>
      </div>
      <div class="q-pa-sm text-left text-caption text-grey">Untimos Archivos</div>
      <div
        class="q-pa-sm scroll text-bold text-grey-10"
        style="height: 295px"
      >
        <q-pull-to-refresh
          @refresh="refresh"
          color="teal"
        >
          <div
            v-for="(last, index) in lastFiles"
            :key="index"
            class="q-mb-sm"
          >
            <q-card class="my-card">
              <q-item to="/archivosdescargados">
                <q-item-section>
                  <q-item-label class="text-h6">{{ last.name+(index+1) }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ last.doc }}</q-item-label>
                </q-item-section>
                <q-separator vertical />
                <q-item-section avatar>
                  <q-avatar>
                    <img
                      src="statics/logo_quasar.png"
                      style="width: 40px"
                    >
                  </q-avatar>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </q-pull-to-refresh>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      lastFiles: [
        {
          name: 'Titulo',
          doc: 'Archivo'
        },
        {
          name: 'Titulo',
          doc: 'Archivo'
        },
        {
          name: 'Titulo',
          doc: 'Archivo'
        },
        {
          name: 'Titulo',
          doc: 'Archivo'
        }
      ]
    }
  },
  mounted () {
    this.$api.get('hola').then(v => {
      console.log(v)
    })
  },
  methods: {
    refresh (done) {
      setTimeout(() => {
        this.items.push({}, {}, {}, {}, {}, {}, {})
        done()
      }, 1000)
    },
    loadUbication () {
      this.$api.get('location').then(v => {
        this.configUser.ubication = v.country
      })
    }
  }
}
</script>
