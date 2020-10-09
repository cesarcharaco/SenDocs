<template>
  <animation-transition :animation-in-type="AnimationType.ZOOMIN" :animation-out-type="AnimationType.ROLLOUT">
      <div class="q-pa-sm row items-start justify-start animated-body" v-show="show">
        <q-card
          class="bg-grey-1 shadow-2 q-ma-xs q-mt-sm"
          style="width: 100%;border-radius:20px"
        >
          <q-card-section horizontal>
            <q-card-section class="col-3 flex flex-center">
              <q-avatar size="50px">
                <img src="statics/icons/favicon-128x128.png">
              </q-avatar>
            </q-card-section>
            <q-separator inset vertical />
            <q-card-section class="q-pt-xs q-mt-sm">
              <div class="text-h6 q-mt-sm">{{userInfo.name}} {{userInfo.lastName}} </div>
              <div class="text-overline">{{userInfo.email}}</div>
              <q-separator inset />
              <div class="text-caption text-bold q-mt-sm">Informacion del Plan</div>
              <div class="column text-grey" v-if="planInfo.plan">
                <div v-if="planInfo.plan.name != 'Plan 4'">
                  Cantidad: {{planInfo.avaiableFiles}} / {{planInfo.plan.fileLimit}}
                </div>
                <div v-else-if="planInfo.plan.name == 'Plan 4'">
                  Sin limite de Archivos
                </div>
                <div>
                  Disponible: {{ planInfo.availableStorage}} / {{ planInfo.plan.storage  }}
                </div>
              </div>
              <div v-else-if="planInfo.error" class="text-caption text-negative" >{{planInfo.msg}} </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
</animation-transition>
</template>

<script>
export default {

}
</script>

<style>

</style>
