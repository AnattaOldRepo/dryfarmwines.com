<template lang="pug">
	.vp-addon__grid
		.vp-section.vp-card(
			v-for="(variant, index) in product.shopify_product.variants"
			v-if="activeVariant(variant)"
			:key="index"
		)
			.vp-addons__box
				.vp-addons__imageBox
					img.vp-addons__image(
						:src="product.shopify_product.images[variant.image_id].src"
						:alt="product.shopify_product.images[variant.image_id].alt"
					)
				p.vp-addons__title {{ activeVariant(variant).info.title }}
				ul.vp-addons__list
					li.vp-addons__listItem(
						v-for="(line, index) in activeVariant(variant).info.copy"
						:key="index"
					) 
						span.vp-addons__listItemIcon(
							v-html="checkCircle"
						)
						span.vp-addons__listItemText {{ line }}
				p.vp-addons__price {{ variant.price | formatMoney() }}
				button.vp-addons__button.u-btn.u-btn--greenLight(
					@click="addSubscription({id: variant.id})"
				) Add To My Subscription
				//- button.vp-addons__button.u-btn.u-btn--blue(
				//- 	@click="addSubscription({id: variant.id, is_subscription_item: 0 })"
				//- ) Add To My Order
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { variantCopy, variantList } from "../../assets/js";
import { checkCircle, chevronBlue } from "../../assets/svg";
export default {
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      checkCircle,
      chevronBlue,
      variantList,
      variantCopy
    };
  },
  computed: {
    ...mapGetters("subscriptions", ["subscriptions"])
  },
  methods: {
    ...mapActions("subscriptions", ["addSubscription"]),
    alreadyActive(variant) {
      let alreadyActive = false;
      Object.keys(this.subscriptions).forEach(subscriptionId => {
        if (
          this.subscriptions[subscriptionId].shopify_variant_id === variant.id
        ) {
          alreadyActive = true;
        }
      });
      return alreadyActive;
    },
    activeVariant(variant) {
      if (
        this.variantList.indexOf(variant.id) != -1 &&
        !this.alreadyActive(variant)
      ) {
        variant.info = variantCopy[variant.id];
        return variant;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/settings";

.vp-addons__box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 50px 30px;
  background-color: $color-white;
}
.vp-addons__imageBox {
  height: 150px;
}
.vp-addons__image {
  max-height: 100%;
}
.vp-addons__title {
  font-size: 15px;
  margin: 15px 0 8px;
}
.vp-addons__list {
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.vp-addons__listItem {
  padding: 0 30px;
  font-size: 14px;
  display: flex;
  text-align: left;
}
.vp-addons__listItemIcon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  padding-top: 3px;
  & >>> svg {
    width: inherit;
    height: inherit;
  }
}
.vp-addons__price {
  margin: 0 0 30px;
  font-size: 20px;
  line-height: 1;
}
.vp-addons__button {
  margin-bottom: 20px;
}
</style>
