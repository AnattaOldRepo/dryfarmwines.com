<template lang="pug">
	.vp-subscription
		.vp-side.vp-side--left
			//- .vp-section
			//- 	h2.vp-h2 Your next shipment
			//- 	SubscriptionDelivery
			//- 	button.vp-card__button.u-btn.u-btn--greenLight(
			//- 		v-if="activeDelivery"
			//- 		@click="skipDelivery"
			//- 		:class="!canSkip() ? 'u-btn--disabled' : ''"
			//- 		:disabled="!canSkip()"
			//- 	) Skip shipment
			.vp-section
				h2.vp-h2 Your subscription
				SubscriptionList
				button.vp-card__button.u-btn.u-btn--greenLight(
					v-if="activeDelivery"
					@click="skipDelivery"
				) Skip Shipment
				a.vp-card__cancel(
					v-if="!isEmptyObject(subscriptions)"
					@click="setModal('ModalCancel')"
				) Cancel subscription
			.vp-section
				//- h2.vp-h2 Subscription Details
				SubscriptionAddress
		.vp-side.vp-side--right
			h2.vp-h2 Add To your subscription
			SubscriptionAddons(
				v-for="(product, index) in products"
				:product="product"
				:key="index"
			)
</template>

<script>
import SubscriptionDelivery from "../components/subscription/SubscriptionDelivery.vue";
import SubscriptionList from "../components/subscription/SubscriptionList.vue";
import SubscriptionAddress from "../components/subscription/SubscriptionAddress.vue";
import SubscriptionAddons from "../components/subscription/SubscriptionAddons.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import moment from "moment";
import { isEmptyObject } from "../assets/js";
import { chevronBlue } from "../assets/svg";
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
    };
  },
  computed: {
    ...mapGetters("products", ["products"]),
    ...mapGetters("deliveries", [
      "activeDelivery",
      "activeDeliveryDate",
      "deliverySettings"
    ]),
    ...mapGetters("subscriptions", ["subscriptions"])
  },
  methods: {
    ...mapMutations("ui", ["setDrawer", "setModal"]),
    ...mapActions("deliveries", ["skipDelivery"]),
    ...mapActions("subscriptions", ["pauseAllSubscriptions"]),
    canSkip() {
      const maxDate = moment()
        .add(120, "days")
        .toDate();
      const nextDate = moment(this.activeDeliveryDate).add(
        this.deliverySettings.deliveryInterval,
        "days"
      );
      return maxDate - nextDate > 0;
    }
  }
};
</script>

<style scoped>
@import "../assets/css/index.css";

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