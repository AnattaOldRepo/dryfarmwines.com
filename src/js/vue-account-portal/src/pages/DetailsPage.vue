<template lang="pug">
	.vp-details
		.vp-side.vp-side--left
			.vp-section
				h2.vp-h2 Your Subscription
				DetailsSubscription
			.vp-section
				h2.vp-h2 Billing Address
				DetailsBilling
				a.vp-card__button.u-btn.u-btn--greenLight(
					:href="editBillingUrl"
				) Edit Address
			.vp-section
				h2.vp-h2 Payment Method
				DetailsPayment
				a.vp-card__button.u-btn.u-btn--greenLight(
					:href="editPaymentUrl"
				) Edit Card
</template>

<script>
import DetailsSubscription from "../components/details/DetailsSubscription.vue";
import DetailsBilling from "../components/details/DetailsBilling.vue";
import DetailsPayment from "../components/details/DetailsPayment.vue";
import { mapGetters } from "vuex";
import { rechargeUrl, previewThemeQuery } from "../config";
import { chevronBlue } from "../assets/svg";
export default {
  components: {
    DetailsSubscription,
    DetailsBilling,
    DetailsPayment
  },
  data() {
    return {
      chevronBlue
    };
  },
  computed: {
    ...mapGetters("customer", ["hash"]),
    editBillingUrl() {
      return `${rechargeUrl}${this.hash}/edit${previewThemeQuery}`;
    },
    editPaymentUrl() {
      return `${rechargeUrl}${this.hash}/card${previewThemeQuery}`;
    }
  }
};
</script>

<style scoped>
@import "../assets/css/index.css";
.vp-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (--tablet-large) {
  .vp-details {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>