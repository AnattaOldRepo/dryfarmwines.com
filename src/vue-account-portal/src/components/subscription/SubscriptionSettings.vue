<template>
  <BaseCardWrapper>
    <BaseCardItem
      heading="Delivery Every"
      @click="setDrawer('DrawerInterval')"
      aria-label="Change delivery frequency"
      has-large-text
    >
      <div>
        {{ deliverySettings.deliveryInterval }} {{ deliverySettings.deliveryUnit }}s
      </div>
    </BaseCardItem>
    <BaseCardItem
      v-if="!subscriptionsEmpty"
      class="vp-subscription__list"
      heading="Products"
      aria-label="Edit product"
    >
      <SubscriptionListItem
        v-for="(subscription, index) in subscriptions"
        :key="index"
        :item="subscription"
      />
    </BaseCardItem>
  </BaseCardWrapper>
</template>

<script>
import SubscriptionListItem from './SubscriptionListItem.vue'
import { isEmptyObject } from '../../assets/js'
import { mapGetters, mapMutations } from 'vuex'
import subscriptions from '../../store/subscriptions'

export default {
  components: {
    SubscriptionListItem
  },

  computed: {
    ...mapGetters('subscriptions', ['subscriptions']),

    ...mapGetters('deliveries', ['deliverySettings']),

    subscriptionsEmpty: () => isEmptyObject(subscriptions),
  },

  methods: {
    ...mapMutations('ui', ['setDrawer'])
  }
}
</script>
