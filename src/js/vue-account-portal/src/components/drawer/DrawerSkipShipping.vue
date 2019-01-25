<template>
  <div class="vp-drawer__inner">
    <div class="vp-drawer__header">
      <h2 class="vp-h2 vp-drawer__h2">Ships On</h2>
    </div>
    <div class="vp-drawer__content">
      <div class="vp-drawer__subtitle">
        {{ activeDelivery.date | formatDate('MMM D, YYYY') }}
      </div>
      <div>Want to skip a shipment?</div>
      <BaseButton @click.native="skipDelivery">Yes, Skip a Shipment</BaseButton>
      <div class="vp-nextShipments">
        <h3>Next Shipments</h3>
        <div v-for="shipment in nextShipments" :key="shipment">
          {{ shipment | formatDate('MMM Do, YYYY') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('deliveries', ['deliverySettings', 'activeDelivery']),

    nextShipments() {
      const nextShipments = Object.keys(
        this.$store.state.deliveries.deliveries
      ).slice(1, 3)
      return nextShipments
    }
  },

  methods: {
    ...mapActions('deliveries', ['skipDelivery'])
  }
}
</script>

<style scoped>
@import '../../assets/css/settings';

.vp-drawer__subtitle {
  font-size: 1.33em;
}
</style>
