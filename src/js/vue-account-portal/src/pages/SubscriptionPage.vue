<template lang="pug">
	.vp-subscription
		.vp-side.vp-side--left
			.vp-section
				h2.vp-h2 Your Next Shipment
				SubscriptionList
				BaseButton.vp-card__button(
					v-if="activeDelivery"
					@click="setDrawer('DrawerSkipShipping')"
				) Skip A Shipment
			.vp-section
				h2.vp-h2 Address & Payment
				SubscriptionAddress
				BaseButton.vp-card__button(
					v-if="!isEmptyObject(subscriptions)"
					@click.native="setModal('ModalCancel')"
				) Cancel Subscription
		.vp-side.vp-side--right
			h2.vp-h2 Add To Your Subscription
			SubscriptionAddons(:products="products")
</template>

<script>
import SubscriptionDelivery from '../components/subscription/SubscriptionDelivery.vue'
import SubscriptionList from '../components/subscription/SubscriptionList.vue'
import SubscriptionAddress from '../components/subscription/SubscriptionAddress.vue'
import SubscriptionAddons from '../components/subscription/SubscriptionAddons.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import moment from 'moment'
import { isEmptyObject } from '../assets/js'
import { chevronBlue } from '../assets/svg'
export default {
  components: {
    SubscriptionDelivery,
    SubscriptionList,
    SubscriptionAddress,
    SubscriptionAddons
  },
  data() {
    return {
      isEmptyObject,
      chevronBlue
    }
  },
  computed: {
    ...mapGetters('products', ['products']),
    ...mapGetters('deliveries', [
      'activeDelivery',
      'activeDeliveryDate',
      'deliverySettings'
    ]),
    ...mapGetters('subscriptions', ['subscriptions']),
    productsArray() {
      return Object.keys(this.products).map(key => this.products[key])
    }
  },
  methods: {
    ...mapMutations('ui', ['setDrawer', 'setModal']),
    ...mapActions('subscriptions', ['pauseAllSubscriptions']),
    canSkip() {
      const maxDate = moment()
        .add(120, 'days')
        .toDate()
      const nextDate = moment(this.activeDeliveryDate).add(
        this.deliverySettings.deliveryInterval,
        'days'
      )
      return maxDate - nextDate > 0
    }
  }
}
</script>

<style scoped>
@import '../assets/css/index.css';

.vp-subscription {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vp-card__cancel {
  margin-left: 20px;
  display: inline-block;
  color: $color-primary !important;
}
@media (--tablet-large) {
  .vp-subscription {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>
