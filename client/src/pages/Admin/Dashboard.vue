<template>
  <div>
      <q-card class="q-pa-xs bg-teal-9 text-white" @click="$router.push('/lista_clientes')">
        <q-card-section>
          <q-item>
            <q-item-section avatar>
              <q-icon name="perm_identity" style="font-size:40px" />
            </q-item-section>
            <q-item-section>
              <div class="column">
                <div class="text-bold row justify-center" style="font-size: 15px">Usuarios Registrados:</div>
                <div class="text-h4 text-bold row justify-center q-mt-sm"> {{data.users}} </div>
              </div>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        users: 0
      }
    }
  },
  async mounted () {
    this.$q.loading.show({
      message: 'Cargando...'
    })
    await this.getRecord()
    this.$q.loading.hide()
  },
  methods: {
    async getRecord () {
      this.$api.get('dashboard_adm').then(res => {
        this.data = res
      })
    }
  }
}
</script>

<style>

</style>
