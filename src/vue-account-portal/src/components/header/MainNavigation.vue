<template lang="pug">
	nav.vp-mainNav
		div
			a.vp-mainNav__link(
				:href="siteUrl"
			)
				span.vp-MainNav__linkArrow(v-html="backArrow")
				span Back To Site
		.vp__mainNav__userData
			template(v-if="!onEditCustomerPage")
				router-link.vp-mainNav__link(
					:to="{ name: 'SubscriptionPage', params: { }}"
					exact
				) Your Subcription
				router-link.vp-mainNav__link(to="/details") Your Details
				router-link.vp-mainNav__link(
					:to="{ name: 'HistoryPage', params: { }}"
				) Subscription History
			template(v-if="onEditCustomerPage")
				a.vp-mainNav__link(
					:href="resetUrls.subscription"
					exact
				) Your Subscription
				a.vp-mainNav__link(:href="resetUrls.details") Your Details
				a.vp-mainNav__link(:href="resetUrls.history") Subscription History
		div
			a.vp-mainNav__link(href="/account/logout") Sign Out
</template>

<script>
import { mapGetters } from 'vuex'
import { onEditCustomerPage, resetUrls } from '../../assets/js'
import { backArrow } from '../../assets/svg'
import { siteUrl } from '../../config'

export default {
  data() {
    return {
      onEditCustomerPage: onEditCustomerPage(),
      backArrow,
      siteUrl
    }
  },
  computed: {
    resetUrls() {
      return resetUrls(VuePortal.customerHash)
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/settings';
.vp-mainNav {
  display: flex;
  justify-content: space-between;
  max-width: 1015px;
  padding: 3em 30px;
  margin: auto;
}

.vp__mainNav__userData {
  display: flex;

  a:not(:last-child) {
    margin-right: 3.5em;
  }
}

.vp-mainNav__link {
  && {
    color: $gray-text;
    font-size: 13px;
    font-weight: bold;
    font-family: $font-circular-pro;
    text-transform: uppercase;
    transition: all 0.3s ease;
    &:hover,
    &.router-link-active {
      color: $red;
    }
  }
}
.vp-mainNav__button {
  background-color: white;
  color: $color-primary;
}
</style>
