<template lang="pug">
	.vp-card.vp-order
		a.vp-card__block.vp-order__header(
			@click="toggleOrder"
		)
			p.vp-order__date {{ order.processed_at | formatDate("ll") }}
			span.vp-order__arrow(
				:class="orderExpanded ? 'vp-order__arrow--expanded' : ''"
				v-html="chevronBlue"
			)
		.vp-card__block.vp-card__block--hasBorder.vp-order__content(
			v-if="orderExpanded"
		)
			.vp-order
				p.vp-order__status Order Status: {{ order.status }}
				h4.vp-order__number Order #: {{ order.shopify_order_number }}
				HistoryOrderItem(
					v-for="(item, index) in order.line_items"
					:key="index"
					:item="item"
				)
</template>

<script>
/* p.vp-order__date {{ order.processed_at | formatDate("ll") }} - {{ order.total_price | formatMoney("missingDecimal") }} 
 	.vp-order__summary
				.vp-order__summaryLine Total #[span {{ order.total_price | formatMoney("missingDecimal") }}] */

import HistoryOrderItem from './HistoryOrderItem.vue'
import { chevronBlue } from '../../assets/svg'
export default {
  props: {
    order: {
      type: Object,
      default: () => {}
    },
    products: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    HistoryOrderItem
  },
  data() {
    return {
      chevronBlue,
      orderExpanded: false
    }
  },
  methods: {
    toggleOrder() {
      this.orderExpanded = !this.orderExpanded
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/settings';

.vp-order {
  margin-bottom: 60px;
  width: 100%;
  max-width: 600px;
}
.vp-order__header {
  &:hover {
    cursor: pointer;
  }
}
.vp-order__content {
  padding-top: 30px !important;
  margin-top: 0 !important;
}
.vp-order__date {
  font-size: 17px;
  margin: 0;
}
.vp-order__arrow {
  position: absolute;
  top: calc(50% - 10px);
  right: 30px;
  width: 10px;
  transition: transform 0.2s ease-in-out;
  transform: rotate(90deg);
  transform-origin: 50% 50%;
}
.vp-order__arrow >>> svg {
  display: block;
}
.vp-order__arrow--expanded {
  transform: rotate(270deg);
}
.vp-order {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
}
.vp-order__status {
  text-transform: uppercase;
  font-size: 14px;
  margin: 0;
}
.vp-order__number {
  text-align: left;
  color: $color-greenLight;
  font-size: 14px;
}
.vp-order__summary {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 30px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  font-family: 'Circular Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  font-size: 14px;
}
.vp-order__summaryLine {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 200px;
  margin: 5px 0;
  span {
    margin-left: 30px;
  }
}
</style>
