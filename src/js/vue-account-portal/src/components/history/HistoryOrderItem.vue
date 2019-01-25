<template lang="pug">
	.vp-item
		.vp-item__imageBox
			img.vp-item__image(
				:src="shopifyVariantImage.src"
				:alt="shopifyVariantImage.alt"
			)
		p.vp-item__title {{ variantInfo.title }}
		.vp-item__summary
			span.vp-item__summaryLine.vp-item__summaryLine--isFaded QTY: {{ item.quantity }}
			span.vp-item__summaryLine.vp-item__summaryLine--isFaded {{ item.price | formatMoney() }}
			span.vp-item__summaryLine {{ item.price | doMath(item.quantity, "multiply") | formatMoney() }}
</template>

<script>
import { variantCopy } from '../../assets/js'
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    shopifyVariantImage() {
      return this.$store.getters['products/shopifyVariantImage'](
        this.item.shopify_product_id,
        this.item.shopify_variant_id
      )
    },
    variantInfo() {
      if (variantCopy[this.item.shopify_variant_id]) {
        return variantCopy[this.item.shopify_variant_id]
      } else {
        return { title: this.item.product_title }
      }
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/settings';
@import '../../assets/css/tools';

.vp-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding: 40px 0;
  margin: 20px 0;
}
.vp-item__imageBox {
  width: 60px;
}
.vp-item__image {
  width: 100%;
}
.vp-item__title {
  flex: 1;
  font-size: 14px;
  padding: 0 10px;
  max-width: 50%;
  margin: 0;
}
.vp-item__summary {
  display: flex;
  justify-content: flex-end;
  flex: 0 0 100%;
  margin-top: 10px;
}
.vp-item__summaryLine {
  margin-left: 30px;
  font-family: $font-circular-pro;
  font-size: 14px;
  text-transform: uppercase;
}
.vp-item__summaryLine--isFaded {
  opacity: 0.35;
}
@media (--tablet) {
  .vp-item {
    justify-content: space-between;
    flex-wrap: nowrap;
  }
  .vp-item__summary {
    margin-top: 0;
    justify-content: space-between;
    flex: 1;
  }
  .vp-item__summaryLine {
    margin-left: 0;
  }
}
</style>
