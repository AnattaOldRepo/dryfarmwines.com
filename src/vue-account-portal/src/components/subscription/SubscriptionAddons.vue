<template lang="pug">
  .vp-subscriptionAddons__grid
    .vp-addons__box(
      v-for="(variant, index) in activeVariantProducts"
      :key="variant.id"
    )
      .vp-addons__imageBox
        img.vp-addons__image(
          :src="getProductImage(variant.productData, variant)"
          :alt="getProductImageAlt(variant.productData, variant)"
        )
      p.vp-addons__title {{ variant.productData.title }}
      p.vp-addons__price {{ variant.price | formatMoney() }}
      BaseButton.vp-addons__button(
        @click="addSubscription({id: variant.id})"
      ) Select
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { variantCopy, variantList } from '../../assets/js'
import { checkCircle, chevronBlue } from '../../assets/svg'
export default {
  props: {
    products: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    checkCircle,
    chevronBlue,
    variantList,
    variantCopy
  }),

  computed: {
    ...mapGetters('subscriptions', ['subscriptions']),

    activeVariantProducts() {
      return Object.keys(this.products).reduce((final, productKey) => {
        const product = this.products[productKey]
        const { variants } = product.shopify_product

        const activeProductVariants = Object.keys(variants)
          .filter(variantKey => {
            return this.activeVariant(variants[variantKey])
              ? variants[variantKey]
              : false
          })
          .map(variantKey => ({
            ...variants[variantKey],
            productData: product
          }))

        return [...final, ...activeProductVariants]
      }, [])
    }
  },

  methods: {
    ...mapActions('subscriptions', ['addSubscription']),

    alreadyActive(variant) {
      let alreadyActive = false
      Object.keys(this.subscriptions).forEach(subscriptionId => {
        if (
          this.subscriptions[subscriptionId].shopify_variant_id === variant.id
        ) {
          alreadyActive = true
        }
      })
      return alreadyActive
    },

    activeVariant(variant) {
      if (
        this.variantList.includes(variant.id) &&
        !this.alreadyActive(variant)
      ) {
        variant.info = variantCopy[variant.id]
        return variant
      } else {
        return false
      }
    },

    getProductImage(product, variant) {
      return product.shopify_product.images[variant.image_id].src
    },

    getProductImageAlt(product, variant) {
      return product.shopify_product.images[variant.image_id].alt
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/settings';

.vp-subscriptionAddons__grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
  gap: 2em 1.618em;
}
.vp-addons__box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  background-color: $white;
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
  text-transform: uppercase;
}
</style>
