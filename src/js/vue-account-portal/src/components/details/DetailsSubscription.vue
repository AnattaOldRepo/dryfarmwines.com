<template lang="pug">
	.vp-card
		router-link.vp-card__block.vp-card__block--isLink(
			:to="{ name: 'SubscriptionPage', params: { }}"
			exact
		)
			h4.vp-card__heading {{ fullName }}
			p.vp-card__text(
				v-if="activeDelivery"
			) Next shipment is on {{ activeDelivery.date | formatDate("MMM Do") }}
			p.vp-card__text(
				v-else
			) No upcoming shipments
			span.vp-card__arrow(
				v-html="chevronBlue"
			)
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import { chevronBlue } from "../../assets/svg";

export default {
  data() {
    return {
      chevronBlue
    };
  },
  computed: {
    ...mapGetters("customer", ["fullName"]),
    ...mapGetters("deliveries", ["activeDelivery"])
  }
};
</script>