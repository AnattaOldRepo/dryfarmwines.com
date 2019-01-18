<template lang="pug">
	.vp-card
		a.vp-card__block.vp-card__block--isLink(
			v-if="!isEmptyObject(paymentMethod)"
			:href="editPaymentUrl"
		)
			h4.vp-card__heading Payment Method
			p.vp-card__text {{ customerCard }}
			span.vp-card__arrow(
				v-html="chevronBlue"
			)
</template>

<script>
import { mapGetters } from "vuex";
import { cleanAddress, isEmptyObject } from "../../assets/js";
import { rechargeUrl, previewThemeQuery } from "../../config";
import { chevronBlue } from "../../assets/svg";
export default {
  data() {
    return {
      isEmptyObject,
      chevronBlue
    };
  },
  computed: {
    ...mapGetters("customer", ["paymentMethod", "hash"]),
    customerCard() {
      return cleanPayment(this.paymentMethod);
    },
    editPaymentUrl() {
      return `${rechargeUrl}${this.hash}/card${previewThemeQuery}`;
    }
  }
};
</script>