<template>
  <div>
    <div class="row q-mt-xl q-mr-lg">
      <div class="row">
        <q-btn color="grey" @click="$router.go(-1)" icon="keyboard_backspace" round dense class="q-ml-md" />
        <div class="row items-center q-ml-sm text-grey">Volver</div>
      </div>
      <q-space />
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" icon="home" />
        <q-breadcrumbs-el label="Cuentas Registradas" />
      </q-breadcrumbs>
    </div>
    <div class="row q-mt-sm q-mr-md">
      <q-space />
      <q-btn label="nuevo usuario" color="primary" style="border-radius: 15px" to="/crear_usuario" />
    </div>
    <q-list bordered class="shadow-2 q-pa-xs q-ma-sm card-border q-mt-md">
      <q-item v-for="(user,index) in data" :key="index" >
        <q-item-section avatar>
          <q-icon name="perm_identity" color="primary" />
        </q-item-section>
        <q-item-section class="text-primary">
          <q-item-label class="text-bold"> {{user.name}} {{user.lastName}} </q-item-label>
          <q-item-label caption> {{user.email}} </q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label>{{user.created_at}}</q-item-label>
          <q-btn icon="more_vert" flat rounded color="primary">
            <q-menu transition-show="jump-down" transition-hide="jump-up" fit :offset="[0, 10]" anchor="bottom right" self="top right" v-close-popup auto-close >
              <q-item clickable v-ripple @click="showDialogPlan(index)" style="width:200px" class="text-primary" >
                <q-item-section avatar>
                  <q-icon color="primary" name="dns" />
                </q-item-section>
                <q-item-section>Asignar un Plan</q-item-section>
              </q-item>
            </q-menu>
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>
    <q-dialog v-model="showDialogPlanBool" v-if="data.length > 0">
      <q-card class="full-width">
        <q-card-section class="bg-primary text-white">
          <div class="text-h5">Asigne un plan</div>
          <div class="text-subtitleh2">usuario:
            <label class="text-bold">{{data[indexData].email}}</label></div>
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item tag="label" v-ripple v-for="(plan, index) in planes" :key="index">
              <q-item-section avatar top>
                <q-radio v-model="selectPlan" :val="plan.name" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{plan.name}}</q-item-label>
                <q-item-label caption>{{plan.description}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn label="Cerrar" color="primary" flat v-close-popup />
          <q-btn label="Guardar" color="primary" push @click="planSave()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      data: [],
      showDialogPlanBool: false,
      indexData: 0,
      selectPlan: 'Plan 1',
      formPlan: {},
      planes: [
        {
          name: 'Plan 1',
          description: 'Plan Gratis, que Incluye 3 dias gratis y un almacenamiento de 1 GB y una cantidad de 5 archivos',
          storage: 1073741824, // establecido en Bytesbytes Equivalente a 1GB
          fileLimit: 5, // limite de archivos que puede subir
          days: 3,
          created_at: ''
        },
        {
          name: 'Plan 2',
          description: 'Plan 2, que Incluye un tiempo total de 1 año y un almacenamiento de 1 GB y una cantidad de 25 archivos',
          storage: 1073741824, // establecido en Bytesbytes EQUIVALENTE A 1GB
          fileLimit: 25, // limite de archivos que puede subir
          days: 365,
          created_at: ''
        },
        {
          name: 'Plan 3',
          description: 'Plan 3 que Incluye un tiempo total de 1 año y un almacenamiento de 5 GB y una cantidad de 100 archivos',
          storage: 5368709120, // establecido en Bytesbytes EQUIVALENTE A 5GB
          fileLimit: 100, // limite de archivos que puede subir
          days: 365,
          created_at: ''
        },
        {
          name: 'Plan 4',
          description: 'Plan 4 que Incluye un tiempo total de 1 año y un almacenamiento de 15 GB y una cantidad ilimitada de archivos',
          storage: 16106127360, // establecido en Bytesbytes EQUIVALENTE A 15GB
          days: 365,
          fileLimit: 999999999, //  puede subir la cantidad que sea hasta cumplir el plazo de vencimiento del plan
          created_at: ''
        },
        {
          name: 'Plan Gratis',
          description: 'Plan Gratis que Incluye un tiempo total de 1 año y un almacenamiento de 25 MB y una cantidad de 5 archivos',
          storage: 26214400, // establecido en Bytesbytes EQUIVALENTE A 15GB
          days: 365,
          fileLimit: 5,
          price: 0,
          created_at: ''
        }
      ]
    }
  },
  async mounted () {
    await this.getRecord()
  },
  methods: {
    async getRecord() {
      this.$q.loading.show()
      await this.$api.get('users').then(res => {
        this.data = res
        console.log(this.data)
      })
      this.$q.loading.hide()
    },
    showDialogPlan (index) {
      this.showDialogPlanBool = true
      this.indexData = index
      this.selectPlan = this.data[index].plan ? this.data[index].plan.name : 'Plan 1'
    },
    async planSave () {
      this.$q.loading.show()
      for (let j in this.planes) {
        if (this.planes[j].name === this.selectPlan) {
          this.formPlan = this.planes[j]
        }
      }
      this.formPlan.created_at = moment().toDate()
      console.log(this.formPlan, 'formPlan')
      await this.$api.put('assign_plan/' + this.data[this.indexData]._id, this.formPlan).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Plan asignado Correctamente',
            color: 'positive',
            type: 'positive'
          })
          this.showDialogPlanBool = false
          this.getRecord()
        }
      })
      this.$q.loading.hide()
    }
  }
}
</script>

<style>

</style>
