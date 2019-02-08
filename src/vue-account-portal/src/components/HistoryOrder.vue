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

<style lang="scss" scoped>
@import '~styles/components/history-order';
</style>
