<template lang="pug">
	.vp-mobileNav
		a.vp-mobileNav__header(
			:href="siteUrl"
		) Back to account
		.vp-mobileNav__main(
			@click="toggleMobileNav"
		)
			.vp-mobileNav__header
				span.vp-mobileNav__title Subscription
				span.vp-mobileNav__arrow(
					v-html="chevronWhite"
					:class="mobileNavOpen ? 'c-mobileNav__arrow--isOpen' : ''"
				)
			nav.vp-mobileNav__mainNav(
				v-if="mobileNavOpen"
			)
				router-link.vp-mobileNav__link(
					v-if="!onEditCustomerPage"
					:to="{ name: 'SubscriptionPage', params: { }}"
					exact
				) Your Subcription
				router-link.vp-mobileNav__link(
					v-if="!onEditCustomerPage"
					to="/details"
				) Your Details
				router-link.vp-mobileNav__link(
					v-if="!onEditCustomerPage"
					:to="{ name: 'HistoryPage', params: { }}"
				) Subscription History
				a.vp-mobileNav__link(
					v-if="onEditCustomerPage"
					:href="resetUrls.subscription"
					exact
				) Your Subscription
				a.vp-mobileNav__link(
					v-if="onEditCustomerPage"
					:href="resetUrls.details"
				) Your Details
				a.vp-mobileNav__link(
					v-if="onEditCustomerPage"
					:href="resetUrls.history"
				) Subscription History
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { onEditCustomerPage, resetUrls } from '../../assets/js'
import { chevronWhite } from '../../assets/svg'
import { siteUrl } from '../../config'

export default {
  data() {
    return {
      onEditCustomerPage,
      chevronWhite,
      siteUrl
    }
  },
  computed: {
    ...mapGetters('ui', ['mobileNavOpen']),
    resetUrls() {
      return resetUrls(VuePortal.customerHash)
    }
  },
  methods: {
    ...mapMutations('ui', ['toggleMobileNav'])
  }
}
</script>

<style scoped>
@import '../../assets/css/settings';
.vp-mobileNav {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vp-mobileNav__header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  color: $gray-text;
  font-size: 13px;
  font-family: $font-circular-pro;
  text-transform: uppercase;
  transition: all 0.3s ease;
  &:hover {
    opacity: 1;
    color: $gray-text;
    cursor: pointer;
  }
}
.vp-mobileNav__arrow {
  width: 6px;
  height: 10px;
  transform: rotate(90deg);
  transform-origin: 50% 50%;
  margin-left: 10px;
  opacity: 0.5;
  transition: opacity 0.3s ease, transform 0.2s ease-in-out;
  & >>> svg {
    display: block;
  }
}
.vp-mobileNav__arrow--isOpen {
  transform: rotate(270deg);
}
.vp-mobileNav__header:hover .vp-mobileNav__arrow {
  opacity: 1;
}
.vp-mobileNav__main {
  width: 100%;
  .vp-mobileNav__header {
    border: none;
  }
}
.vp-mobileNav__mainNav {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 0 auto 30px;
  padding: 0 30px;
}
.vp-mobileNav__link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  font-family: $font-circular-pro;
  text-transform: uppercase;
  transition: all 0.3s ease;
  &:hover,
  &.router-link-active {
    opacity: 1;
    color: rgba(255, 255, 255, 1);
  }
}
.vp-mobileNav__button {
  background-color: white;
  color: $color-primary;
}
</style>
