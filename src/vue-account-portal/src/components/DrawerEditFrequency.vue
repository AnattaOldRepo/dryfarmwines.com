<template>
  <div class="c-rDrawerEditFrequency">
    <span class="c-rDrawer__title">DELIVERY EVERY</span>

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
.c-rDrawerEditFrequency__frequencyOptionsContainer {
  margin-top: 30px;
  display: grid;
  grid-template-columns: calc(50% - 15px) calc(50% - 15px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}

.c-rDrawerEditFrequency__option {
  border-radius: 10px;
  border: 3px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 12px;
  margin-bottom: 0;
  text-transform: uppercase;
  cursor: pointer;

  font-size: 17px;
  line-height: 29px;
  letter-spacing: 2px;

  &:hover {
    border-color: #7fc464;
  }

  &.is-active {
    border-color: #7fc464;

    .c-rDrawerEditFrequency__optionCheck {
      display: block;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    svg {
      width: 13px;
      fill-color: white;
      fill: white;
      margin-left: -1px;
      margin-bottom: -1px;
    }
  }

  &.c-rDrawerEditFrequency__option--oneTime {
  }

  &.c-rDrawerEditFrequency__option--subscription {
    position: relative;
  }
}

.c-rDrawerEditFrequency__optionCheck {
  display: none;
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  left: 50%;
  top: -2px;
  background-color: #7fc464;
  border-radius: 100px;
  color: #fff;
  width: 24px;
  height: 24px;
}

.c-rDrawer__updateMessage {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
}

.c-rDrawer__updateMessageText {
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
  letter-spacing: 2px;
  text-transform: uppercase;

  &.c-rDrawer__updateMessageText--success {
    color: #7fc464;
  }
}

.c-rDrawer__updateMessageIcon--save {
  background-color: #7fc464;
  border-radius: 100px;
  color: #fff;
  width: 24px;
  height: 24px;

  svg {
    width: 13px;
    fill: #fff;
    margin-left: -1px;
    margin-bottom: -1px;
  }
}
</style>
