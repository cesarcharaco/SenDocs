<template>
  <div>
    <div class="text-h6 q-ma-md"> Cuentas Registradas </div>
    <q-separator  inset/>
    <q-list bordered class="shadow-2 q-pa-xs q-ma-sm">
      <q-item v-for="(user,index) in data" :key="index" >
        <q-item-section avatar>
          <q-icon name="perm_identity" color="primary" />
        </q-item-section>
        <q-item-section class="text-primary">
          <q-item-label class="text-bold"> {{user.fullName}} </q-item-label>
          <q-item-label caption> {{user.email}} </q-item-label>
        </q-item-section>
        <q-item-section side top>{{user.created_at}}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.getRecord()
  },
  methods: {
    getRecord() {
      this.$api.get('users').then(res => {
        this.data = res
      })
    }
  }
}
</script>

<style>

</style>
