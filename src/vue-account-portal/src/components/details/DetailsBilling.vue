<template lang="pug">
	.vp-card
		a.vp-card__block.vp-card__block--isLink(
			v-if="!isEmptyObject(cleanBilling)"
			:href="editBillingUrl"
		)
			h4.vp-card__heading Billing Address
			p.vp-card__text
				span(
					v-for="(line, index) in cleanBilling"
					v-if="line"
					:key="index"
				) {{ line }} #[br]
			span.vp-card__arrow(
				v-html="chevronBlue"
			)
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { cleanAddress, isEmptyObject } from '../../assets/js'
import { rechargeUrl, previewThemeQuery } from '../../config'
import { chevronBlue } from '../../assets/svg'
export default {
  data() {
    return {
      isEmptyObject,
      chevronBlue
    }
  },
  computed: {
    ...mapGetters('customer', ['billingAddress', 'hash']),
    cleanBilling() {
      return cleanAddress(this.billingAddress, 'billing')
    },
    editBillingUrl() {
      return `${rechargeUrl}${this.hash}/edit${previewThemeQuery}`
    }
  },
  methods: {
    ...mapMutations('ui', ['setDrawer'])
  }
}
</script>
