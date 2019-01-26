<template>
  <base-card-wrapper>
    <base-card-item
      heading="Ships On"
      @click="setDrawer('DrawerDate')"
      has-large-text
    >
      <div v-if="activeDelivery">
        {{ activeDelivery.date | formatDate("MMM Do") }}
      </div>
      <div
        v-else
        class="vp-card__text"
      >
        You don't have any upcoming deliveries.
      </div>
    </base-card-item>
    <div
      class="vp-subscription__list"
      v-if="!subscriptionsEmpty"
    >
      <base-card-item
        v-for="(subscription, index) in subscriptions"
        :key="index"
      >
        <subscription-list-item
          should-open-drawer
          :item="subscription"
        />
      </base-card-item>
    </div>
    <base-card-item
      tag="div"
      has-large-text
      presentational
    >
      <div>Total: {{ total | formatMoney() }}</div>
    </base-card-item>
  </base-card-wrapper>
</template>

<script>
import SubscriptionListItem from './SubscriptionListItem'
import { mapGetters, mapMutations } from 'vuex'
import { isEmptyObject } from '../../assets/js'
import subscriptions from '../../store/subscriptions'
import deliveries from '../../store/deliveries'

export default {
  components: { SubscriptionListItem },

  computed: {
    ...mapGetters('subscriptions', ['subscriptions']),

    ...mapGetters('deliveries', ['activeDelivery']),

    subscriptionsEmpty() {
      return isEmptyObject(subscriptions)
    },

    total() {
      const { delivery: deliveryOrders } = this.activeDelivery
      return Object.keys(deliveryOrders).reduce(
        (total, key) => total + deliveryOrders[key].price,
        0
      )
    }
  },
  methods: {
    ...mapMutations('ui', ['setDrawer'])
  }
}
</script>

<style scoped>
.vp-card__block--hasBorder {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
