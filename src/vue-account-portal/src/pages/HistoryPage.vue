<template lang="pug">
  .vp-history
    h2.vp-h2 Subscription History
    HistoryOrder(
      v-if="!isEmptyObject(orders)"
      v-for="(order, index) in orders"
      :key="index"
      :order="order"
    )
</template>

<script>
import HistoryOrder from '../components/history/HistoryOrder.vue'
import { mapState } from 'vuex'
import { isEmptyObject } from '../assets/js'
export default {
  data() {
    return {
      isEmptyObject
    }
  },
  components: {
    HistoryOrder
  },
  computed: {
    ...mapState(['orders'])
  }
}
</script>

<style scoped>
@import '../assets/css/index.css';
.vp-history {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vp-h2 {
  text-align: center !important;
}
</style>
