<template>
  <q-card class="full-width">
    <q-card-section>
      <div class="texh-h6 text-bold">Selecciona un Plan</div>
      <q-list>
        <q-item tag="label" v-ripple v-for="(plan, index) in planes" :key="index">
          <q-item-section avatar top>
            <q-radio @input="selectPrice" v-model="selectPlan" :val="plan.name" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{plan.name}}</q-item-label>
            <q-item-label caption>{{plan.description}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <div v-if="product.price > 0" class="column items-center justify-start text-bold">
        <div class="col-5 text-primary" style="font-size:20px">Total a pagar:</div>
        <div class="col-5 text-bold text-primary" style="font-size:32px"> {{product.price}}$ </div>
      </div>
      <paypal v-if="product.price > 0" class="q-pa-lg" :product="product" />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn push color="primary" label="Guardar" style="float: right" glossy @click="onSubmit()" />
    </q-card-actions>
  </q-card>
</template>

<script>
import Paypal from '../components/PaypalRegistro'
export default {
  components: {
    Paypal
  },
  data () {
    return {
      selectPlan: 'Plan 1',
      product: {
        price: 0,
        description: "esto es una prueba de 1$",
        img: "../statics/Sen-Docs logo 50x50.png"
      },
      formPlan: {},
      planes: [
        {
          name: 'Plan 1',
          description: 'Plan Gratis, que Incluye 3 dias gratis y un almacenamiento de 1 GB y una cantidad de 5 archivos',
          storage: 1073741824, // establecido en Bytesbytes Equivalente a 1GB
          fileLimit: 5, // limite de archivos que puede subir
          days: 3,
          price: 0
        },
        {
          name: 'Plan 2',
          description: 'Plan 2, que Incluye un tiempo total de 1 año y un almacenamiento de 1 GB y una cantidad de 25 archivos',
          storage: 1073741824, // establecido en Bytesbytes EQUIVALENTE A 1GB
          fileLimit: 25, // limite de archivos que puede subir
          days: 365,
          price: 30
        },
        {
          name: 'Plan 3',
          description: 'Plan 3 que Incluye un tiempo total de 1 año y un almacenamiento de 5 GB y una cantidad de 100 archivos',
          storage: 5368709120, // establecido en Bytesbytes EQUIVALENTE A 5GB
          fileLimit: 100, // limite de archivos que puede subir
          days: 365,
          price: 40
        },
        {
          name: 'Plan 4',
          description: 'Plan 4 que Incluye un tiempo total de 1 año y un almacenamiento de 15 GB y una cantidad ilimitada de archivos',
          storage: 16106127360, // establecido en Bytesbytes EQUIVALENTE A 15GB
          days: 365,
          fileLimit: 999999999, //  puede subir la cantidad que sea hasta cumplir el plazo de vencimiento del plan
          price: 50
        }
      ]
    }
  },
  methods: {
    selectPrice () {
      let plan = this.planes.find(element => element.name === this.selectPlan)
      this.product.price = plan.price
      this.product.description = plan.description
    }
  }
}
</script>

<style>

</style>
