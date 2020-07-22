<template>
  <q-layout>
    <q-page-container class="fondo">
      <q-page class="row justify-center">
        <div class="col column items-center justify-center">
          <img
            alt="Quasar logo"
            src="statics/Sen-Docs logo 500x500.png"
            style="width:250px; height:250px"
          >
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
  color: rgb(0, 0, 0);
}
</style>
