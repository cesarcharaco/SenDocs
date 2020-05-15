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
              <q-input
                dense
                v-model="form.etiqueta"
                label="Standard"
              />
            </div>
            <div class="col text-bold">
              <q-input
                dense
                v-model="form.nombre"
                label="Standard"
              />
            </div>
            <div class="col text-bold">
              <q-input
                dense
                autogrow
                v-model="form.descripcion"
                label="Standard"
              />
            </div>
          </div>
          <q-separator
            vertical
            inset
            class="q-ma-sm"
          />
          <div class="q-mt-sm column col">
            <q-carousel
              animated
              v-model="slide"
              arrows
              infinite
              style="width:100%; height:100px"
            >
              <q-carousel-slide
                v-for="(arc, index) in form.archivos"
                :key="index"
                :name="index"
                :img-src="arc.url"
                style="width:100%"
              />
            </q-carousel>
          </div>
        </div>
        <div class="row justify-center q-mt-md">
          <div class="column col">
            <div class="text-bold">
              <div>Fecha de Vencimiento:</div>
              <div class="text-h6"> {{form.fvencimiento}} </div>
            </div>
            <div>
              <q-btn
                icon="event"
                round
                color="primary"
              >
                <q-popup-proxy
                  @before-show="fvencimiento = form.fvencimiento"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="fvencimiento">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn
                        label="Cancel"
                        color="primary"
                        flat
                        v-close-popup
                      />
                      <q-btn
                        label="OK"
                        color="primary"
                        flat
                        @click="form.fvencimiento = fvencimiento"
                        v-close-popup
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-btn>
            </div>
          </div>
          <div>
            <div class="column col">
              <div class="text-bold">
                <div>Hora de Vencimiento:</div>
                <div class="text-h6"> {{form.hvencimiento}} </div>
              </div>
              <div class="justify-center">
                <q-btn
                  icon="access_time"
                  round
                  color="primary"
                >
                  <q-popup-proxy
                    @before-show="hvencimiento = form.hvencimiento"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="hvencimiento">
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn
                          label="Cancel"
                          color="primary"
                          flat
                          v-close-popup
                        />
                        <q-btn
                          label="OK"
                          color="primary"
                          flat
                          @click="form.hvencimiento = hvencimiento"
                          v-close-popup
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          class="glossy q-pa-sm"
          rounded
          color="primary"
          label="Guardar"
          style="width:100px"
        />
      </q-card-actions>

    </q-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      hvencimiento: '',
      fvencimiento: '',
      form: {
        etiqueta: 'Etiqueta',
        nombre: 'Nombre',
        descripcion: 'Descripcion',
        fvencimiento: '',
        hvencimiento: '',
        archivos: [
          {
            name: 'nombre del archivo',
            url: 'https://cdn.quasar.dev/img/quasar.jpg'
          },
          {
            name: 'nombre del archivo2',
            url: 'https://cdn.quasar.dev/img/parallax2.jpg'
          }
        ]
      },
      slide: 1
    }
  }
}
</script>

<style>
</style>
