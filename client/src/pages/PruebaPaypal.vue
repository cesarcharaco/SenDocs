<template>
  <q-card class="q-pa-xs q-ma-md">
    <q-card-section>
      <div class="row justify-center text-h6">Pruebas Paypal</div>
    </q-card-section>
    <q-card-section>
      <div>
        <div v-if="!paidFor">
          <h6>Buy this Lamp - ${{ product.price }} OBO</h6>

          <p>{{ product.description }}</p>

        </div>

        <div v-if="paidFor">
          <h6>Noice, you bought a beautiful lamp!</h6>
        </div>

        <div ref="paypal"></div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
// import image from "../assets/lamp.png"
export default {
  name: "HelloWorld",

  data: function() {
    return {
      loaded: false,
      paidFor: false,
      product: {
        price: 1.77,
        description: "esto es una prueba de 1.77",
        img: "../statics/Sen-Docs logo.png"
      }
    };
  },
  mounted: function() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AS7KYEwne8Y06amKI_eTxcHN6K-LeFyQHNj00kL2oPQjoIrUmXAWTbC6c2L-kVo34272x1acHb3grsG4";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
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
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    }
  }
};
</script>

<style>

</style>
