<template>
  <div class="c-rDrawerEditFrequency">
    <span class="c-rDrawer__title">Delivery Every</span>

    <div>
      <div class="c-rDrawerEditFrequency__frequencyOptionsContainer">
        <div
          class="c-rOption"
          v-for="(interval, index) in intervals"
          :key="index"
          :class="{ 'is-active': activeDeliveryFrequency == interval }"
          @click="selectDeliveryFrequency(interval)"
        >
          <span class="c-rOptionText c-rOptionText-11"
            >{{ interval }} {{ activeDeliveryIntervalUnit }}s</span
          >
          <div class="c-rOptionCheck">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 26 26"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              enable-background="new 0 0 26 26"
            >
              <path
                d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="c-rDrawer__updateMessage" v-if="frequencyUpdating">
      <span class="c-rDrawer__updateMessageText">Updating...</span>
    </div>

    <div
      class="c-rDrawer__updateMessage"
      v-if="frequencySaved"
      transition="fade"
    >
      <span
        class="c-rDrawer__updateMessageText c-rDrawer__updateMessageText--success"
        >SAVED</span
      >
      <div class="c-rDrawer__updateMessageIcon--save">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 26 26"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          enable-background="new 0 0 26 26"
        >
          <path
            d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'DrawerEditFrequency',

  mounted() {
    console.log(this.$data, this.$props, this)
  },

  computed: {
    ...mapState([
      'drawerOpen',
      'drawerContentType',
      'customerHash',

      'frequencyUpdating',
      'frequencySaved',

      'activeFirstDeliverySubscription',
      'activeDeliveryAddressId',
      'activeDeliveryFrequency',
      'activeDeliveryIntervalUnit'
    ]),

    ...mapGetters([
      'activeDeliveryChargeScheduledAt',
      'activeDeliveryScheduleGetter'
    ]),

    intervals() {
      if (
        this.activeFirstDeliverySubscription &&
        this.activeFirstDeliverySubscription.interval_options &&
        this.activeFirstDeliverySubscription
      ) {
        return this.activeFirstDeliverySubscription.interval_options[
          this.activeDeliveryIntervalUnit
        ]
      }

      return null
    }
  },

  methods: {
    ...mapMutations([
      'setDrawerContentType',
      'closeDrawer',
      'openDrawer',
      'toggleDrawer',

      'setActiveDeliveryFrequency'
    ]),

    ...mapActions(['selectDeliveryFrequencyAction']),

    selectDeliveryFrequency(intervalFrequency) {
      const vm = this
      const {
        activeDeliveryScheduleGetter,
        activeFirstDeliverySubscription,
        activeDeliveryFrequency,
        activeDeliveryIntervalUnit,
        customerHash
      } = this

      const activeDeliveryScheduleDeliveries =
        activeDeliveryScheduleGetter.delivery

      let payload = {
        subscriptionIds: [],
        intervalFrequency: intervalFrequency,
        activeDeliveryIntervalUnit: activeDeliveryIntervalUnit
      }

      activeDeliveryScheduleDeliveries.forEach(function(delivery) {
        payload.subscriptionIds.push(delivery.subscription.id)
      })

      this.selectDeliveryFrequencyAction(payload)
    },

    closeDrawerAndResetType() {
      this.closeDrawer()
      vm.frequencySaved = false

      setTimeout(() => {
        this.resetType(false)
      }, 301)
    }
  }
}
</script>

<style lang="scss">
@import '~styles/components/drawer-edit-frequency';
</style>
