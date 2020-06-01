<template>
  <div class="q-pa-md">
    <q-input
      v-model="form.nombre"
      label="Nombre del Documento"
    />
    <q-input
      v-model="form.etiqueta"
      label="Etiqueta del Documento"
    />
    <q-input
      v-model="form.correo"
      label="Correo"
    />
    <q-input
      v-model="form.fvencimiento"
      mask="date"
      readonly
      :rules="['date']"
      label="Fecha de Vencimiento"
    >
      <template v-slot:append>
        <q-btn
          icon="event"
          color="primary"
          class="q-mr-md"
          round
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
      label="Subir Archivos"
      multiple
      :factory="factoryFn"
      style="max-width: 400px; width:100%: height: 100%"
    />

    <q-card-actions align="right">
      <q-btn
        class="glossy q-pa-sm"
        rounded
        color="primary"
        label="Subir"
        style="width:100px"
      />
    </q-card-actions>
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
