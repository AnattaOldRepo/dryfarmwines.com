<template>
  <div class="vp-details">
    <div class="vp-side vp-side--left">
      <div class="vp-section">
        <h2 class="vp-h2">Your Subscription</h2>
        <DetailsSubscription />
      </div>
      <div class="vp-section">
        <h2 class="vp-h2">Billing Address</h2>
        <DetailsBilling />
        <a
          class="vp-card__button c-button c-button--greenLight"
          :href="editBillingUrl"
        >
          Edit Address
        </a>
      </div>
      <div class="vp-section">
        <h2 class="vp-h2">Payment Method</h2>
        <BaseCardWrapper>
          <DetailsPayment />
        </BaseCardWrapper>
        <a
          class="vp-card__button c-button c-button--greenLight"
          :href="editPaymentUrl"
        >
          Edit Card
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import DetailsSubscription from '../components/details/DetailsSubscription.vue'
import DetailsBilling from '../components/details/DetailsBilling.vue'
import DetailsPayment from '../components/details/DetailsPayment.vue'
import { mapGetters } from 'vuex'
import { rechargeUrl, previewThemeQuery } from '../config'
import { chevronBlue } from '../assets/svg'
export default {
  components: {
    DetailsSubscription,
    DetailsBilling,
    DetailsPayment
  },
  data() {
    return {
      chevronBlue
    }
  },
  computed: {
    ...mapGetters('customer', ['hash']),
    editBillingUrl() {
      return `${rechargeUrl}${this.hash}/edit${previewThemeQuery}`
    },
    editPaymentUrl() {
      return `${rechargeUrl}${this.hash}/card${previewThemeQuery}`
    }
  }
}
</script>

<style scoped>
@import '../assets/css/index.css';
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
