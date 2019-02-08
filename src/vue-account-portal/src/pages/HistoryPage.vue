<template>
  <div class="c-rHistory">
    <div
      class="c-sub__initialContainer"
      v-if="initialRechargeDataLoading"
    >
      <span class="c-sub__initialMessage">Loading...</span>
    </div>

    <div v-else>
      <h1 class="c-rPageTitle">Subscription History</h1>
      <HistoryOrder
        v-for="order in orders"
        :key="order.id"
        :order="order"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import HistoryOrder from '../components/HistoryOrder.vue'
import { mapState } from 'vuex'

export default {
  name: 'History',

  components: {
    HistoryOrder
  },

  props: {
    orders: {
      type: Array,
      required: true
    }
  },

  computed: {
    ...mapState(['initialRechargeDataLoading'])
  }
}
</script>

<style lang="scss">
@import '~styles/pages/history-page';
</style>
