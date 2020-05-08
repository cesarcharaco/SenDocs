<template>
  <q-layout>
    <q-page-container class="fondo">
      <q-page class="row justify-center">
        <div class="col column items-center justify-center">
          <img
            alt="Quasar logo"
            src="~assets/quasar-logo-full.svg"
          >
          <div class="footer gray">
            <p>Un proyecto EICHE</p>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      form: {},
      isPwd: true,
      loading: false
    }
  },
  mounted () {
  },
  methods: {
    getStorage () {

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
  color: darkslategray;
}
</style>
