<template>
  <q-card class="full-width">
    <q-card-section>
      <div class="texh-h6 text-bold">Selecciona un Plan</div>
        <q-card v-ripple v-for="(plan, index) in planes" :key="index" class="shadow-2 q-pa-xs q-ma-sm" bordered @click="selectPrice(plan.name)">
          <q-card-section>
            <div class="row">
              <div class="text-h6 row justify-center text-grey-10 text-bold">
              {{plan.name}}
                  <q-icon class="q-mt-xs q-ml-sm" name="check_circle_outline" color="positive" v-if="selectPlan === plan.name" />
              </div>
            </div>
            <p class="text-grey-9"> {{plan.description}} </p>
            <div class="row">
              <div class="col text-bold text-grey-10 q-mt-xs" style="font-size:15px">Precio:</div>
              <div class="col-9 text-bold text-primary" style="font-size:20px">{{plan.price}}$</div>
            </div>
          </q-card-section>
        </q-card>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <div v-if="product.price > 0" class="column items-center justify-start text-bold">
        <div class="col-5 text-grey-10" style="font-size:20px">Total a pagar:</div>
        <div class="col-5 text-bold text-primary" style="font-size:32px"> {{product.price}}$ </div>
      </div>
      <paypal v-if="product.price > 0" class="q-pa-lg" :product="product" :form="form" :selectedPlan="formPlan" />
    </q-card-section>
  </q-card>
</template>

<script>
import Paypal from '../components/PaypalRegistro'
import moment from 'moment'
export default {
  props: {
    form: {
      type: Object
    }
  },
  components: {
    Paypal
  },
  data () {
    return {
      selectPlan: 'Plan 2',
      product: {
        price: 0,
        description: "esto es una prueba de 1$",
        img: "../statics/Sen-Docs logo 50x50.png"
      },
      formPlan: {},
      planes: [
        /* {
          name: 'Plan 1',
          description: 'Plan Gratis, que Incluye 3 dias gratis y un almacenamiento de 1 GB y una cantidad de 5 archivos',
          storage: 1073741824, // establecido en Bytesbytes Equivalente a 1GB
          fileLimit: 5, // limite de archivos que puede subir
          days: 3,
          price: 0
        }, */
        {
          name: 'Plan 2',
          description: 'Plan 2, que Incluye un tiempo total de 1 año y un almacenamiento de 1 GB y una cantidad de 25 archivos',
          storage: 1073741824, // establecido en Bytesbytes EQUIVALENTE A 1GB
          fileLimit: 25, // limite de archivos que puede subir
          days: 365,
          price: 30,
          created_at: ''
        },
        {
          name: 'Plan 3',
          description: 'Plan 3 que Incluye un tiempo total de 1 año y un almacenamiento de 5 GB y una cantidad de 100 archivos',
          storage: 5368709120, // establecido en Bytesbytes EQUIVALENTE A 5GB
          fileLimit: 100, // limite de archivos que puede subir
          days: 365,
          price: 40,
          created_at: ''
        },
        {
          name: 'Plan 4',
          description: 'Plan 4 que Incluye un tiempo total de 1 año y un almacenamiento de 15 GB y una cantidad ilimitada de archivos',
          storage: 16106127360, // establecido en Bytesbytes EQUIVALENTE A 15GB
          days: 365,
          fileLimit: 999999999, //  puede subir la cantidad que sea hasta cumplir el plazo de vencimiento del plan
          price: 50,
          created_at: ''
        }
      ]
    }
  },
  mounted () {
    this.selectPrice('Plan 2')
  },
  methods: {
    async selectPrice (plan_name) {
      this.selectPlan = plan_name
      let plan = this.planes.find(element => element.name === this.selectPlan)
      this.plan.created_at = moment().toDate()
      this.product.price = plan.price
      this.product.description = plan.description
      this.formPlan = plan
      this.form.plan = this.formPlan
      console.log(this.formPlan, 'formPlan', this.form, 'form')
    }
  }
}
</script>

<style>

</style>
