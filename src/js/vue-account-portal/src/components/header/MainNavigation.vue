<template lang="pug">
	nav.vp-mainNav
		a.vp-mainNav__link(
			:href="siteUrl"
		)
			span.vp-MainNav__linkArrow(
				v-html="backArrow"
			)
			span Back To Site
		router-link.vp-mainNav__link(
			v-if="!onEditCustomerPage"
			:to="{ name: 'SubscriptionPage', params: { }}"
			exact
		) Your Subcription
		router-link.vp-mainNav__link(
			v-if="!onEditCustomerPage"
			to="/details"
		) Your Details
		router-link.vp-mainNav__link(
			v-if="!onEditCustomerPage"
			:to="{ name: 'HistoryPage', params: { }}"
		) Subscription History
		a.vp-mainNav__link(
			v-if="onEditCustomerPage"
			:href="resetUrls.subscription"
			exact
		) Your Subscription
		a.vp-mainNav__link(
			v-if="onEditCustomerPage"
			:href="resetUrls.details"
		) Your Details
		a.vp-mainNav__link(
			v-if="onEditCustomerPage"
			:href="resetUrls.history"
		) Subscription History
</template>

<script>
import { mapGetters } from "vuex";
import { onEditCustomerPage, resetUrls } from "../../assets/js";
import { backArrow } from "../../assets/svg";
import { siteUrl } from "../../config";

export default {
  data() {
    return {
      onEditCustomerPage: onEditCustomerPage(),
      backArrow,
      siteUrl
    };
  },
  computed: {
    resetUrls() {
      return resetUrls(VuePortal.customerHash);
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/settings";
.vp-mainNav {
  display: flex;
  justify-content: space-around;
  max-width: 1200px;
  padding: 20px 30px;
  margin: auto;
}
.vp-mainNav__link {
  && {
    color: $color-white;
    font-size: 13px;
    font-family: $font-circular-pro;
    text-transform: uppercase;
    opacity: 0.5;
    transition: all 0.3s ease;
    &:hover,
    &.router-link-active {
      color: $color-white;
      opacity: 1;
    }
  }
}
.vp-mainNav__button {
  background-color: white;
  color: $color-primary;
}
</style>