<template lang="pug">
	.vp-drawer__content
		.vp-drawer__row.vp-item__imageBox
			img.vp-item__image(
				:src="shopifyVariantImage.src"
				:alt="shopifyVariantImage.alt"
			)
		.vp-drawer__row.vp-item__details 
			.vp-item__title.vp-drawer__text--bold {{ activeSubscription.product_title }}
			.vp-drawer__text {{ activeSubscription.price | formatMoney("missingDecimal") }}
		.vp-drawer__row.vp-item__quantity.vp-field.vp-field--quanity 
			button.vp-field__control.vp-field__control--minus(
				@click="updateQuantity('decrease')"
			) - 
			span.vp-field__quantity {{ updateInfo.quantity }}
			button.vp-field__control.vp-field__control--add(
				@click="updateQuantity('increase')"
			) +
		button.vp-drawer__button.u-btn.u-btn--greenLight(
			@click="handleSubscriptionUpdate"
		) Save Product
		button.vp-drawer__button.u-btn.u-btn--blue(
			@click="handleSubscriptionCancel"
		) Cancel Product
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { checkBadge } from '../../assets/svg'

export default {
  data() {
    return {
      updateInfo: {}
    }
  },
  computed: {
    ...mapGetters('subscriptions', ['activeSubscription']),
    shopifyVariantImage() {
      return this.$store.getters['products/shopifyVariantImage'](
        this.activeSubscription.shopify_product_id,
        this.activeSubscription.shopify_variant_id
      )
    },
    subscriptionTotal() {
      return this.activeSubscription.price * this.activeSubscription.quantity
    }
  },
  methods: {
    ...mapMutations('ui', ['setDrawer', 'closeDrawer']),
    ...mapActions('subscriptions', [
      'updateSubscription',
      'cancelSubscription'
    ]),
    updateQuantity(action) {
      action === 'decrease'
        ? this.updateInfo.quantity > 0
          ? this.updateInfo.quantity--
          : ''
        : this.updateInfo.quantity < 3
        ? this.updateInfo.quantity++
        : ''
    },
    handleSubscriptionUpdate() {
      this.updateSubscription({
        subscriptionId: this.activeSubscription.id,
        data: this.updateInfo
      })
    },
    async handleSubscriptionCancel() {
      await this.cancelSubscription({
        subscriptionId: this.activeSubscription.id
      })
    }
  },
  watch: {
    activeSubscription() {
      this.$emit('saved')
    }
  },
  mounted() {
    const sub = this.activeSubscription
    this.updateInfo = {
      quantity: sub.quantity,
      order_interval_frequency: sub.charge_interval_frequency,
      order_interval_unit: sub.charge_interval_unit
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/settings';

.vp-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.vp-item__imageBox {
  width: 100px;
  margin-bottom: 15px !important;
}
.vp-item__details {
  margin-bottom: 30px;
  flex-direction: column;
  text-align: center;
}
.vp-item__title {
  margin-bottom: 10px;
}
.vp-field__control,
.vp-field__quantity {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: 1px solid rgba(0, 40, 86, 0.85);
  font-size: 17px;
}
.vp-field__control {
  background-color: rgba(0, 40, 86, 0.75);
  border-radius: 5px 0 0 5px;
  color: white;
  font-family: $font-circular-pro;
  transition: background-color 0.3s ease;
  &:focus {
    outline: none;
    box-shadow: none !important;
  }
  &:hover {
    background-color: rgba(0, 40, 86, 0.85);
  }
}
.vp-field__control--minus {
  border-radius: 5px 0 0 5px;
}
.vp-field__control--add {
  border-radius: 0 5px 5px 0;
}
.vp-field__quantity {
  width: 40px;
  height: 40px;
  border-left: none;
  border-right: none;
}
</style>
