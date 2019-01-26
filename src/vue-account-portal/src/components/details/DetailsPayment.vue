<template>
  <base-card-item
    tag="a"
    :href="editPaymentUrl"
    v-if="hasPaymentMethod"
    class="vp-card__block--isLink"
    heading="Payment Method"
  >
    <div class="vp-card__text vp-paymentInfo">
      <img
        v-if="cardBrand.image"
        class="vp-paymentInfo__img"
        :src="cardBrand.image"
        :alt="cardBrand.brand"
      >
      <span>{{ customerCard }}</span>
    </div>
  </base-card-item>
</template>

<script>
import { mapGetters } from 'vuex'
import { isEmptyObject } from '@/assets/js'
import { cleanPayment } from '@/assets/js/cleanPayment'
import { rechargeUrl, previewThemeQuery } from '@/config'
import paymentBrandImages from '@/assets/js/paymentBrandImages'

export default {
  computed: {
    ...mapGetters('customer', ['paymentMethod', 'paymentBrand', 'hash']),

    customerCard() {
      return cleanPayment(this.paymentMethod)
    },

    cardBrand() {
      return {
        image: paymentBrandImages[this.paymentBrand.toLowerCase()],
        brand: this.paymentBrand
      }
    },

    editPaymentUrl() {
      return `${rechargeUrl}${this.hash}/card${previewThemeQuery}`
    },

    hasPaymentMethod() {
      return !isEmptyObject(this.paymentMethod)
    }
  }
}
</script>

<style scoped>
.vp-paymentInfo {
  display: flex !important;
  align-items: center;
}

.vp-paymentInfo__img {
  display: block;
  margin-right: 10px;
}
</style>

