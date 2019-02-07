<template>
  <div class="c-rDrawerEditPayment">
    <span class="c-rDrawer__title">Payment Method</span>
    <div
      class="c-sub__card"
      v-if="customer.customer_card"
    >
      <img
        v-if="creditCardImage"
        :src="creditCardImage"
      />
      <span> *{{ customer.customer_card.last4 }}</span>
      <span>{{ customer.customer_card.exp_month }}/{{
        customer.customer_card.exp_month
        }}</span>
    </div>

    <div class="c-rDrawer__actionBox">
      <base-button :href="`${rechargeURL}${this.customerHash}/card${previewThemeQuery}`">
        Edit Card
      </base-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { rechargeURL, previewThemeQuery } from '@/config'

export default {
  data: () => ({ rechargeURL, previewThemeQuery }),

  computed: {
    ...mapState([
      'drawerOpen',
      'drawerContentType',
      'customerHash',
      'customer'
    ]),

    creditCardImage() {
      let creditCardBrand = ''
      let creditCardImage = ''

      if (this.customer.customer_card && this.customer.customer_card.brand) {
        creditCardBrand = this.customer.customer_card.brand
      }

      switch (creditCardBrand) {
        case 'Visa':
          creditCardImage =
            'https://cdn.shopify.com/s/files/1/0739/9341/files/visa-icon.png?9900082236234763207'
          break
        case 'American Express':
          creditCardImage =
            'https://cdn.shopify.com/s/files/1/0739/9341/files/amex-icon.png?9900082236234763207'
          break
        case 'Mastercard':
          creditCardImage =
            'https://cdn.shopify.com/s/files/1/0739/9341/files/mastercard-icon.png?9900082236234763207'
          break
        default:
          creditCardImage = false
      }

      return creditCardImage
    }
  },

  methods: {
    ...mapMutations([
      'setDrawerContentType',
      'closeDrawer',
      'openDrawer',
      'toggleDrawer'
    ]),

    closeDrawerAndResetType() {
      this.closeDrawer()
      setTimeout(() => {
        this.resetType(false)
      }, 301)
    }
  }
}
</script>

<style lang="scss">
.c-rDrawerEditPayment {
  .c-sub__card {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 20px;

    img {
      width: 50px;
      margin-right: 10px;
    }

    span {
      display: inline-block;
      margin-bottom: 0;
      line-height: 1;

      &:first-of-type {
        margin-right: 5px;
      }
    }
  }
}

.c-rForm__inputWrapper {
  width: 100%;

  &--third {
    display: grid;
    grid-template-columns: repeat(3, calc(1fr - 7px));
    grid-column: 20px;
  }
}
</style>
