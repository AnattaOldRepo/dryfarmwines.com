<template lang="pug">
		.vp-card
			a.vp-card__block.vp-card__block--isLink(
				@click="setDrawer('DrawerDate')"
			)
				h4.vp-card__heading Ships on
				p.vp-card__text.vp-card__text--large(
					v-if="activeDeliveryList"
				) {{ activeDelivery.date | formatDate("MMM D") }}
				p.vp-card__text(
					v-else
				) You don't have any upcoming deliveries.
				span.vp-card__arrow(
					v-html="chevronBlue"
				)
			.vp-delivery__list(
				v-if="activeDeliveryList"
			)
				SubscriptionDeliveryItem(
					v-for="(delivery, index) in activeDeliveryList.delivery"
					:key="index"
					:item="delivery.subscription"
				)
			.vp-card__block.vp-card__block--hasBorder(
				v-if="deliveryTotal"
			)
				p.vp-card__total Total: {{ deliveryTotal | formatMoney("missingDecimal") }}
</template>

<script>
import SubscriptionDeliveryItem from "./SubscriptionDeliveryItem.vue";
import { mapState, mapGetters, mapMutations } from "vuex";
import { deliveryTotal } from "../../assets/js";
import { chevronBlue } from "../../assets/svg";
export default {
  components: {
    SubscriptionDeliveryItem
  },
  data() {
    return {
      chevronBlue
    };
  },
  computed: {
    ...mapGetters("deliveries", ["activeDelivery"]),
    activeDeliveryList() {
      return this.activeDelivery ? this.activeDelivery : false;
    },
    deliveryTotal() {
      return this.activeDelivery ? deliveryTotal(this.activeDelivery) : false;
    }
  },
  methods: {
    ...mapMutations("ui", ["setDrawer"])
  }
};
</script>