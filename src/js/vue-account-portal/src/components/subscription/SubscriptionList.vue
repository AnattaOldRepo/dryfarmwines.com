<template lang="pug">
		.vp-card
			a.vp-card__block.vp-card__block--isLink(
				@click="setDrawer('DrawerDate')"
			)
				h4.vp-card__heading Ships on
				p.vp-card__text.vp-card__text--large(
					v-if="activeDelivery"
				) {{ activeDelivery.date | formatDate("MMM D") }}
				p.vp-card__text(
					v-else
				) You don't have any upcoming deliveries.
				span.vp-card__arrow(
					v-html="chevronBlue"
				)
			a.vp-card__block.vp-card__block--isLink.vp-card__block--hasBorder(
				@click="setDrawer('DrawerInterval')"
			)
				h4.vp-card__heading Delivery Every
				p.vp-card__text.vp-card__text--large(
				) {{ deliverySettings.deliveryInterval }} {{ deliverySettings.deliveryUnit }}s
				span.vp-card__arrow(
					v-html="chevronBlue"
				)
			.vp-subscription__list(
				v-if="!subscriptionsEmpty"
			)
				SubscriptionListItem(
					v-for="(subscription, index) in subscriptions"
					:key="index"
					:item="subscription"
				)
</template>

<script>
import SubscriptionListItem from "./SubscriptionListItem.vue";
import { mapGetters, mapMutations } from "vuex";
import { isEmptyObject } from "../../assets/js";
import { chevronBlue } from "../../assets/svg";
import subscriptions from "../../store/subscriptions";
export default {
  components: {
    SubscriptionListItem
  },
  data() {
    return {
      isEmptyObject,
      chevronBlue
    };
  },
  computed: {
    ...mapGetters("subscriptions", ["subscriptions"]),
    ...mapGetters("deliveries", ["deliverySettings", "activeDelivery"]),
    subscriptionsEmpty() {
      return isEmptyObject(subscriptions);
    }
  },
  methods: {
    ...mapMutations("ui", ["setDrawer"])
  }
};
</script>

<style scoped>
.vp-card__block--hasBorder {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
</style>