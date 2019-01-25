<template lang="pug">
	.vp-drawer__inner
		.vp-drawer__header
			h2.vp-h2.vp-drawer__h2 Edit Delivery Schedule
		.vp-drawer__saved(
			v-if="saved"
		)
			span.vp-drawer__savedIcon(
				v-html="checkBadge"
			)
			.vp-drawer__savedText Schedule Saved
		.vp-drawer__content.vp-delivery
			button.vp-delivery__option(
				v-for="(item, index) in deliveryOptions"
				:class="deliverySettings.deliveryInterval == item ? 'vp-delivery__option--selected' : ''"
				@click="updateAllIntervals(item)"
			) {{ item }} Days
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { cleanAddress } from '../../assets/js'
import { checkBadge } from '../../assets/svg'
export default {
  data() {
    return {
      saved: false,
      deliveryOptions: [15, 30, 45, 60],
      checkBadge
    }
  },
  computed: {
    ...mapGetters('deliveries', ['deliverySettings']),
    cleanBilling() {
      return cleanAddress(this.billingAddress, 'billing')
    }
  },
  methods: {
    ...mapActions('subscriptions', ['updateAllIntervals']),
    markSaved() {
      this.saved = true
    }
  },
  watch: {
    deliverySettings() {
      this.markSaved()
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/settings';
.vp-delivery__option {
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
  padding: 10px;
  background-color: white;
  border: 2px solid $color-green;
  border-radius: 5px;
  color: $color-green;
  font-family: $font-avenir-demi;
  text-transform: uppercase;
  transition: all 0.3s ease;
  &:hover,
  &:focus {
    cursor: pointer;
    background-color: $color-green;
    color: white;
    outline: none;
    box-shadow: none;
  }
}
.vp-delivery__option--selected,
.vp-delivery__option--selected:focus {
  background-color: $color-primary;
  border: 2px solid $color-primary;
  color: white;
  pointer-events: none;
}
</style>
