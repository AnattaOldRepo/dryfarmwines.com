<template>
  <div class="c-order">
    <div
      class="c-rOrderHeader"
      :class="{ 'is-open': orderOpen }"
      @click="toggleOrder"
    >
      <span>{{ prettyOrderProcessedDate }} -
        {{ formatMoney(order.total_price) }}</span>
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="306px"
        height="306px"
        viewBox="0 0 306 306"
        style="enable-background:new 0 0 306 306;"
        xml:space="preserve"
      >
        <polygon points="94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153 		" />
      </svg>
    </div>

    <div
      class="c-rOrderMain"
      v-if="orderOpen"
    >
      <div class="c-rOrderMain__info">
        <span>ORDER STATUS: {{ order.status }}</span>
        <span class="u-font-bold">ORDER #: {{ order.id }}</span>
      </div>

      <div class="c-rOrderMain__lineItems">
        <div
          class="c-rOrderMain__lineItem"
          v-for="(item, index) in order.line_items"
          :key="index"
        >
          <div class="c-rOrderMain__topItemWrap">
            <div class="c-rOrderMain__itemItemImageBox">
              <img :src="getProductVariantImage(products, item)" />
            </div>

            <div class="c-rOrderMain__lineItemContentBox">
              <p>{{ item.title }}</p>
              <div class="c-rOrderMain__itemItemPricingBox c-rOrderMain__itemItemPricingBox--desktop">
                <span class="is-faded">QTY: {{ item.quantity }}</span>
                <span class="is-faded">{{ '$' + item.price }}</span>
                <span class="u-font-bold">{{
                  '$' + item.price * item.quantity
                  }}</span>
              </div>
            </div>
          </div>

          <div class="c-rOrderMain__itemItemPricingBox c-rOrderMain__itemItemPricingBox--mobile">
            <span class="is-faded">QTY: {{ item.quantity }}</span>
            <span class="is-faded">{{ '$' + item.price }}</span>
            <span class="u-font-bold">{{
              '$' + item.price * item.quantity
              }}</span>
          </div>
        </div>
      </div>

      <div class="c-rOrderMain__pricingSection u-font-bold">
        <div class="c-rOrderMain__pricing">
          <span>SUBTOTAL</span>
          <span>{{ formatMoney(order.total_price) }}</span>
        </div>

        <div class="c-rOrderMain__pricing">
          <span>SHIPPING</span>
          <span v-if="order.total_shipping">{{
            formatMoney(order.total_shipping)
            }}</span>
          <span v-else>--</span>
        </div>

        <div class="c-rOrderMain__pricing">
          <span>TAX</span>
          <span v-if="order.total_tax">{{ formatMoney(order.total_tax) }}</span>
          <span v-else>--</span>
        </div>

        <div class="c-rOrderMain__pricing">
          <span>DISCOUNT</span>
          <span v-if="order.total_discounts">{{
            formatMoney(order.total_discounts)
            }}</span>
          <span v-else>--</span>
        </div>

        <div class="c-rOrderMain__pricing">
          <span>TOTAL (USD)</span>
          <span>{{ formatMoney(order.total_price) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import productVariantImage from '@/mixins/productVariantImage'
import moment from 'moment'

export default {
  name: 'HistoryOrder',

  props: {
    order: {
      type: Object,
      required: true
    }
  },

  data: function() {
    return {
      orderOpen: false
    }
  },

  mixins: [productVariantImage],

  computed: {
    ...mapState(['products']),

    ...mapGetters(['productImages']),

    prettyOrderProcessedDate() {
      const date = this.order.processed_at
      return moment(date).format('MMM D, YYYY')
    }
  },

  methods: {
    toggleOrder() {
      this.orderOpen = !this.orderOpen
    },

    formatMoney(money) {
      var price = parseFloat(money)
      var priceWithDecimal = (price / 100.0).toFixed(2)

      return '$' + String(priceWithDecimal)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/variables';

.c-order {
  width: 100%;
  max-width: 600px;
  margin: 0 auto 36px;
  border: 1px solid $light-gray;
}

.c-rOrderHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 30px;
  cursor: pointer;

  @media (max-width: 1023px) {
    height: 50px;
    padding: 3px 20px 0;
  }

  span {
    font-weight: 400;
    text-transform: uppercase;
    font-size: 16px;
    line-height: 23px;
    letter-spacing: 1px;
    color: #000;
  }

  svg {
    width: 16px;
    height: 16px;
    transform: rotate(90deg);
  }

  &.is-open svg {
    transform: rotate(270deg);
  }
}

.c-rOrderMain__info {
  padding: 27px 28px 13px;

  @media (max-width: 1023px) {
    padding: 50px 22px 18px;
  }

  span {
    display: block;
    font-weight: 400;
    text-transform: uppercase;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 1px;
    margin-bottom: 13px;

    @media (max-width: 1023px) {
      font-weight: 700;
    }

    &.u-font-bold {
      font-weight: 700;
    }
  }
}

.c-rOrderMain__lineItems {
  padding: 40px 0;
  border-top: 1px solid #737373;
  border-bottom: 1px solid #737373;
  width: calc(100% - 60px);
  margin: 0 auto;

  @media (max-width: 1023px) {
    border-bottom: none;
    width: calc(100% - 40px);
  }
}

.c-rOrderMain__lineItem {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1023px) {
    flex-direction: column;
  }

  .c-rOrderMain__itemItemImageBox {
    margin-right: 10px;
    width: 60px;

    @media (max-width: 1023px) {
      margin-right: 20px;
      width: 64px;
      min-width: 64px;
    }

    img {
      display: block;
      max-width: 100px;
      width: 100%;
    }
  }

  .c-rOrderMain__topItemWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 1023px) {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }

  .c-rOrderMain__lineItemContentBox {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 1023px) {
      flex-direction: column;
    }
  }

  p {
    max-width: 50%;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0px;
    margin: 0;

    @media (max-width: 1023px) {
      width: auto;
      max-width: none;
    }
  }

  .c-rOrderMain__itemItemPricingBox {
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 1024px) {
      flex: 1;
      justify-content: space-between;
      max-width: 210px;
    }

    &--desktop {
      display: none;

      @media (min-width: 1024px) {
        display: flex;
      }
    }

    &--mobile {
      width: 210px;
      margin-top: 18px;
      margin-right: 0;
      align-self: flex-end;
      display: flex;
      justify-content: space-between;
      @media (min-width: 1024px) {
        display: none;
        margin-top: 8px;
      }
    }
  }

  span {
    letter-spacing: 2px;
    font-size: 13px;
    line-height: 16px;
    font-weight: 700;

    &.is-faded {
      opacity: 0.25;
    }
  }
}

.c-rOrderMain__pricingSection {
  padding: 50px 30px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;

  @media (max-width: 1023px) {
    padding: 16px 20px 6px;
  }
}

.c-rOrderMain__pricing {
  width: 100%;
  max-width: 210px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 13px;

  span {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 1px;
  }
}
</style>
