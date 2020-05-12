<template>
  <div class="q-pa-md">
    <q-input
      v-model="form.nomDoc"
      label="Standard"
    />
    <q-input
      v-model="form.correo"
      label="Standard"
    />
    <q-input
      v-model="form.fvencimiento"
      mask="date"
      readonly
      :rules="['date']"
    >
      <template v-slot:append>
        <q-btn
          icon="event"
          color="primary"
          class="q-mr-md"
        >
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="form.fvencimiento"
              @input="() => $refs.qDateProxy.hide()"
            />
          </q-popup-proxy>
        </q-btn>
      </template>
    </q-input>
    <q-uploader
      label="Individual upload"
      multiple
      :factory="factoryFn"
      style="max-width: 400px; width:100%: height: 100%"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {}
    }
  },
  methods: {
    factoryFn (files) {
      console.log(files, 'filesss')
    }
  }
}
</script>

<style>
</style>
