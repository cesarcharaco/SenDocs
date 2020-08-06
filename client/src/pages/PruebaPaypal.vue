<template>
  <q-card class="q-pa-xs q-ma-md">
    <q-card-section>
      <div class="row justify-center text-h6">Pruebas Paypal</div>
    </q-card-section>
    <q-card-section>
      <div>
        <div v-if="!paidFor">
          <h6 class="text-red">Compra de Prueba por un precio de: ${{ product.price }}</h6>

          <p>{{ product.description }}</p>

        </div>

        <div v-if="paidFor">
          <h6 class="text-green">
            Si Aparece esto, es porque se hizo la compra exitosamente por el total de ${{product.price}}
          </h6>
        </div>

        <div ref="paypal"></div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import image from "../statics/Sen-Docs logo 50x50.png"
export default {
  name: "HelloWorld",

  data: function() {
    return {
      loaded: false,
      paidFor: false,
      product: {
        price: 1,
        description: "esto es una prueba de 1$",
        img: "../statics/Sen-Docs logo 50x50.png"
      }
    };
  },
  mounted: function() {
    const script = document.createElement("script")
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AZTnzmmUOx5sBDPMecAspoye5M5Gdgl0udOZw3EWaHDTUv36ELbU-4E6nHZncnt-ZJJkBT7hDVV5I6a-"
    script.addEventListener("load", this.setLoaded)
    document.body.appendChild(script)
  },
  methods: {
    setLoaded: function() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: "USD",
                    value: this.product.price
                  }
                }
              ]
            })
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture()
            this.paidFor = true
            console.log(order)
          },
          onError: err => {
            console.log(err)
          }
        })
        .render(this.$refs.paypal)
    }
  }
}
</script>

<style>

</style>
