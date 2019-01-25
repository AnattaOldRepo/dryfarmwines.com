<template lang="pug">
	.vp-drawer__inner
		.vp-drawer__header
			h2.vp-h2.vp-drawer__h2 Next Shipment
		.vp-drawer__saved(
			v-if="saved"
		)
			span.vp-drawer__savedIcon(
				v-html="checkBadge"
			)
			.vp-drawer__savedText Schedule Saved
		.vp-drawer__content
			.vp-pikaday
					input#c-subscription__pikaday(
						:value="date"
					)
			.vp-drawer__text.vp-drawer__text--small Click on a date to change your delivery.
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mountPikaday } from '../../assets/js'
import Pikaday from 'pikaday'
import { checkBadge } from '../../assets/svg'

export default {
  data() {
    return {
      saved: false,
      date: null,
      nextShipDate: null,
      dateOutsideRestriction: null,
      checkBadge
    }
  },
  computed: {
    ...mapGetters('deliveries', ['activeDeliveryDate'])
  },
  methods: {
    ...mapActions('subscriptions', ['updateAllChargeDates']),
    handleDateChange() {
      this.updateAllChargeDates(this.date)
    },
    markSaved() {
      this.saved = true
    }
  },
  watch: {
    activeDeliveryDate() {
      this.markSaved()
    }
  },
  mounted() {
    this.date = this.activeDeliveryDate
    this.$nextTick(() => {
      mountPikaday(this, 'c-subscription__pikaday')
    })
  }
}
</script>

<style scoped>
.vp-drawer__content {
  padding: 0 20px 60px !important;
}
.vp-pikaday {
  width: 100%;
}
#c-subscription__pikaday {
  height: 0px;
  width: 0px;
  padding: 0px;
  background-color: transparent;
  border: none;
}
</style>
