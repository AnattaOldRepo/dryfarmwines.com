<template>
  <div class="c-rHistory">
    <div class="c-sub__initialContainer" v-if="initialRechargeDataLoading">
      <span class="c-sub__initialMessage">Loading...</span>
    </div>

    <div v-else>
      <h1 class="c-rPageTitle">Subscription History</h1>
      <HistoryOrder v-for="order in orders" :key="order.id" :order="order" />
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

  data: function() {
    return {}
  },

  mounted() {},

  computed: {
    ...mapState(['initialRechargeDataLoading'])
  },

  methods: {}
}
</script>

<style lang="scss">
.c-rHistory {
  @media (max-width: 1023px) {
    padding: 0 30px;
  }
}

.c-rPageTitle {
  font-weight: 400;
  font-size: 19px;
  line-height: 29px;
  letter-spacing: 2px;
  margin: 0;
  padding: 54px 0 32px;
  border: none;
}
</style>
