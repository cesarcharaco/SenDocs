<template>
  <div>
    <q-card
      class="full-width shadow-3"
      bordered
    >
      <q-card-section>
        <div class="row justify-center">
          <div class="column col">
            <div class="col">
              <q-chip
                icon="event"
                class="q-pa-md"
                color="primary"
                text-color="white"
              >Etiqueta</q-chip>
            </div>
            <div class="col q-mt-md q-ml-sm text-bold">
              Nombre del Archivo
            </div>
          </div>
          <q-separator
            vertical
            inset
            class="q-ma-sm"
          />
          <div class="q-mt-sm column">
            <div class="col">Tipo</div>
            <div class="col">Correo Destino</div>
            <div class="col">fecha de Vencimiento</div>
          </div>
          <q-separator
            vertical
            inset
            class="q-ma-sm"
          />
          <div class="q-mt-md q-ml-sm">
            <q-btn
              round
              color="primary"
              icon="update"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  }
}
</script>

<style>
</style>
