<template>
	<div class="vp-subscription">
		<div class="vp-side vp-side--left">
      <div class="vp-section">
				<h2 class="vp-h2">Your Next Shipment</h2>
				<subscription-list />
				<base-button
					v-if="activeDelivery"
          class="vp-card__button"
					@click="setDrawer('DrawerSkipShipping')"
          secondary
				>
          Skip A Shipment
        </base-button>
      </div>
      <div class="vp-section">
        <h2 class="vp-h2">Subscription Settings</h2>
        <subscription-settings />
      </div>
      <div class="vp-section">
				<h2 class="vp-h2">Address & Payment</h2>
				<subscription-address-and-payment />
				<base-button
          class="vp-card__button"
					v-if="!isEmptyObject(subscriptions)"
					@click="setModal('ModalCancel')"
          secondary
				>
          Cancel Subscription
        </base-button>
      </div>
    </div>
    <div class="vp-side vp-side--right">
		  <h2 class="vp-h2">Add To Your Subscription</h2>
			<subscription-addons :products="products" />
    </div>
  </div>
</template>

<script>
import SubscriptionDelivery from '@/components/subscription/SubscriptionDelivery'
import SubscriptionList from '@/components/subscription/SubscriptionList'
import SubscriptionAddressAndPayment from '@/components/subscription/SubscriptionAddressAndPayment'
import SubscriptionSettings from '@/components/subscription/SubscriptionSettings'
import SubscriptionAddons from '@/components/subscription/SubscriptionAddons'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import moment from 'moment'
import { isEmptyObject } from '@/assets/js'
import { chevronBlue } from '@/assets/svg'
export default {
  components: {
    SubscriptionDelivery,
    SubscriptionList,
    SubscriptionAddressAndPayment,
    SubscriptionSettings,
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
