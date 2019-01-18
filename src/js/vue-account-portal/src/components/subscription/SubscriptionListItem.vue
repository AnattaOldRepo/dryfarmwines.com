<template lang="pug">
	a.vp-card__block.vp-card__block--hasBorder.vp-card__block--isLink.vp-item(
		v-if="item.is_active && !item.is_one_time_product"
		@click="openDrawer"
	)
		.vp-item__imageBox
			img.vp-item__image(
				:src="shopifyVariantImage.src"
				:alt="shopifyVariantImage.alt"
			)
		.vp-item__details 
			.vp-item__text {{ variantInfo.title }} 
			.vp-item__tags(
				v-if="!item.is_active"
			)
				span Inactive
			.vp-item__tags #[span Quantity: {{ item.quantity }}]
		span.vp-card__arrow(
			v-html="chevronBlue"
		)
</template>

<script>
import { mapMutations } from "vuex";
import { variantCopy } from "../../assets/js";
import { chevronBlue } from "../../assets/svg";
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chevronBlue
    };
  },
  computed: {
    shopifyVariantImage() {
      return this.$store.getters["products/shopifyVariantImage"](
        this.item.shopify_product_id,
        this.item.shopify_variant_id
      );
    },
    variantInfo() {
      if (variantCopy[this.item.shopify_variant_id]) {
        return variantCopy[this.item.shopify_variant_id];
      } else {
        return { title: this.item.product_title };
      }
    }
  },
  methods: {
    ...mapMutations("ui", ["setDrawer"]),
    ...mapMutations("subscriptions", ["setActiveSubscriptionId"]),
    openDrawer() {
      this.setActiveSubscriptionId(this.item.id);
      this.setDrawer("DrawerSubscription");
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/settings";

.vp-item {
  display: flex;
  align-items: center;
}
.vp-item__imageBox {
  width: 50px;
  margin-right: 10px;
}
.vp-item__text {
  flex: 1;
  font-size: 14px;
}
.vp-item__tags {
  display: flex;
  span {
    margin: 4px 8px 0 0;
    padding: 2px 8px;
    background-color: $color-green;
    border-radius: 2px;
    color: $color-white;
    font-family: $font-avenir-medium;
    font-size: 10px;
    text-transform: uppercase;
  }
}
</style>