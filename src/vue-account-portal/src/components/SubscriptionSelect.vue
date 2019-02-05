<template>
  <div
    class="c-rSubSelect"
    :class="{ 'hide-select': uniqueDeliveries.length === 1 }"
  >
    <div v-if="!combineSubscriptionsUpdating && !combineSubscriptionsSaved">
      <span class="c-rSubSelect__title"
        >Choose A Subscription<br />
        To View</span
      >

      <div class="c-rSubSelect__options">
        <div
          class="c-rOption"
          :class="{
            'is-active':
              activeDeliveryChargeScheduledAt ===
              deliverySchedule.delivery[0].subscription.next_charge_scheduled_at
          }"
          v-for="(deliverySchedule, index) in uniqueDeliveries"
          :key="index"
          @click="setActiveDeliveryScheduleLocal(deliverySchedule, index)"
        >
          <span class="c-rOptionText c-rOptionText--1"
            >Subscription {{ index + 1 }}</span
          >
          <span class="c-rOptionText c-rOptionText--2"
            >Ships on
            {{
              prettyDate(
                deliverySchedule.delivery[0].subscription
                  .next_charge_scheduled_at
              )
            }}</span
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

      <div class="c-rSubSelect__dropdown">
        <div
          class="c-rSubSelect__dropdownMain"
          :class="{ 'is-open': dropdownOptionsOpen }"
          @click="toggleDropdownOptionsOpen()"
        >
          Subscriptions
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="306px"
            height="306px"
            viewBox="0 0 306 306"
            style="enable-background:new 0 0 306 306;"
            xml:space="preserve"
          >
            <polygon
              points="94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153 		"
            />
          </svg>
        </div>
        <div class="c-rSubSelect__dropdownOptions" v-if="dropdownOptionsOpen">
          <div
            class="c-rSubSelect__dropdownOption"
            :class="{
              'is-active':
                activeDeliveryChargeScheduledAt ===
                deliverySchedule.delivery[0].subscription
                  .next_charge_scheduled_at
            }"
            v-for="(deliverySchedule, index) in uniqueDeliveries"
            :key="index"
            @click="setActiveDeliveryScheduleLocal(deliverySchedule, index)"
          >
            Subscription {{ index + 1 }} -
            {{
              prettyDate(
                deliverySchedule.delivery[0].subscription
                  .next_charge_scheduled_at
              )
            }}
          </div>
        </div>
      </div>

      <hr class="c-rSubSelect__hr" />
    </div>

    <div v-else-if="combineSubscriptionsUpdating">
      <div class="c-rDrawer__updateMessage">
        <span class="c-rDrawer__updateMessageText">Updating...</span>
      </div>
    </div>

    <div v-else-if="combineSubscriptionsSaved">
      <div class="c-rSubSelect__savedBox">
        <div class="c-rSubSelect__savedIcon">
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
        <span class="c-rSubSelect__savedText"
          >You’ve successfully combined your subscriptions. All items will be
          shipped on {{ newShipmentDate }}.</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'SubscriptionSelect',

  components: {},

  props: {
    customer: {
      type: Object,
      required: true
    },

    deliverySchedule: {
      type: Array,
      required: false
    },

    products: {
      type: Array,
      required: false
    },

    subscriptions: {
      type: Array,
      required: true
    }
  },

  data: function() {
    return {
      initialDeliverySet: false,
      dropdownOptionsOpen: false
    }
  },

  watch: {
    initialRechargeDataLoadingGetter: {
      immediate: true,
      handler() {
        if (!this.initialDeliverySet) {
          this.setActiveDeliveryScheduleLocal(this.uniqueDeliveries[0], 0)
          this.initialDeliverySet = true
        }
      }
    }
  },

  computed: {
    ...mapState([
      'activeDeliverySchedule',
      'activeDeliveryScheduleIndex',

      'activeFirstDeliverySubscription',
      'activeDeliveryAddressId',
      'activeDeliveryFrequency',
      'activeDeliveryIntervalUnit',

      'combineSubscriptionsUpdating',
      'combineSubscriptionsSaved'
    ]),

    ...mapGetters([
      'activeSubscriptions',
      'uniqueDeliveries',
      'initialRechargeDataLoadingGetter',
      'activeDeliveryChargeScheduledAt',
      'activeDeliveryScheduleGetter'
    ]),

    newShipmentDate() {
      return moment(this.activeDeliveryChargeScheduledAt.split('T')[0]).format(
        'MMMM DD, YYYY'
      )
    }
  },

  methods: {
    ...mapMutations([
      'setActiveDeliverySchedule',
      'setActiveDeliveryScheduleIndex',

      'setActiveFirstDeliverySubscription',
      'setActiveDeliveryAddress',
      'setActiveDeliveryAddressId',
      'setActiveDeliveryFrequency',
      'setActiveDeliveryIntervalUnit'
    ]),

    ...mapActions(['combineSubscriptionsAction']),

    toggleDropdownOptionsOpen() {
      this.dropdownOptionsOpen = !this.dropdownOptionsOpen
    },

    setToggleDropdownOptionsOpen(value) {
      this.dropdownOptionsOpen = false
    },

    combineSubscriptions() {
      this.combineSubscriptionsAction()
      console.log('combineSubscriptionsAction')
    },

    setActiveDeliveryScheduleLocal(deliverySchedule, deliveryScheduleIndex) {
      this.setToggleDropdownOptionsOpen(false)

      console.log('setActiveDeliveryScheduleLocal')
      const activeFirstDeliverySubscription =
        deliverySchedule.delivery[0].subscription

      this.setActiveDeliverySchedule(deliverySchedule)
      this.setActiveDeliveryScheduleIndex(deliveryScheduleIndex)

      this.setActiveFirstDeliverySubscription(activeFirstDeliverySubscription)
      this.setActiveDeliveryAddress(activeFirstDeliverySubscription.address)
      this.setActiveDeliveryAddressId(
        activeFirstDeliverySubscription.address_id
      )
      this.setActiveDeliveryFrequency(
        activeFirstDeliverySubscription.charge_interval_frequency
      )
      this.setActiveDeliveryIntervalUnit(
        activeFirstDeliverySubscription.charge_interval_unit
      )
    },

    prettyDate(date) {
      return moment(date).format('MMMM D')
    }
  }
}
</script>

<style lang="scss">
.c-rSubSelect {
  margin-bottom: 30px;

  @media (max-width: 1023px) {
    margin-bottom: 46px;
    max-width: 312px;
    margin: 0 auto;
  }

  &.hide-select {
    margin-bottom: 30px;
    height: 1px;
    overflow: hidden;
    margin: 0;
    opacity: 0;
  }

  // .is-hidden {
  //     display: none;
  // }

  .c-rOption {
    padding: 20px;
  }

  .c-rButton {
    padding: 10px 94px;
    font-weight: 400;
  }

  .c-rDrawerProduct__actionBox {
    margin-bottom: 50px;

    @media (max-width: 1023px) {
      margin-bottom: 64px;
    }
  }

  .c-rDrawer__updateMessageText {
    font-size: 19px;
  }

  .c-rSubSelect__title {
    @media (max-width: 1023px) {
      margin-bottom: 20px;
      text-align: center;
    }
  }
}

.c-rSubSelect__hr {
  display: none;

  @media (max-width: 1023px) {
    display: block;
    margin-bottom: 26px;
    height: 1px;
    color: #dcdcdc;
    width: 100%;
  }
}

.c-rSubSelect__title {
  font-weight: 700;
  font-size: 23px;
  line-height: 35px;
  letter-spacing: 3px;
  text-transform: uppercase;
  display: block;
  margin-bottom: 35px;

  br {
    display: none;
  }

  @media (max-width: 1024px) {
    line-height: 31px;
    margin-bottom: 18px;

    br {
      display: block;
    }
  }
}

.c-rSubSelect__options {
  grid-template-columns: 300px 300px 300px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dcdcdc;

  display: none;
  @media (min-width: 1024px) {
    display: grid;
  }
}

.c-rSubSelect__text {
  display: block;
  margin-bottom: 22px;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0px;
}

.c-rSubSelect__savedBox {
  width: 100%;
  padding: 17px 30px;
  border: 1px solid #7fc464;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 54px;
}

.c-rSubSelect__savedIcon {
  display: block;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // display: none;
  // position: absolute;
  // transform: translateX(-50%) translateY(-50%);
  // left: 50%;
  // top: -2px;
  background-color: #7fc464;
  border-radius: 100px;
  color: #fff;
  width: 24px;
  height: 24px;
  margin-right: 14px;

  svg {
    width: 13px;
    fill: white;
    margin-left: -1px;
    margin-bottom: -1px;
  }
}

.c-rSubSelect__savedText {
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0;
}

.c-rSubSelect__dropdown {
  display: none;

  @media (max-width: 1023px) {
    display: block;
    position: relative;
    max-width: 224px;
    margin: 0 auto 32px;
  }
}

.c-rSubSelect__dropdownMain {
  background-color: #000;
  color: #fff;
  font-size: 13px;
  text-transform: uppercase;
  padding: 11px 16px 11px 22px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  letter-spacing: 1.5px;
  cursor: pointer;

  &.is-open {
    svg {
      transform: rotate(270deg);
    }
  }

  svg {
    display: inline-block;
    width: 12px;
    height: 12px;
    transform: rotate(90deg);
    fill: #fff;
  }
}

.c-rSubSelect__dropdownOptions {
  position: absolute;
  z-index: 1;
  background-color: #fff;
  width: 100%;
}

.c-rSubSelect__dropdownOption {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 13px;
  text-transform: none;
  padding: 10px 0;
  font-weight: 400;
  border: 1px solid #dcdcdc;
  border-collapse: collapse;
  cursor: pointer;
  margin-top: -1px;
  margin-bottom: -1px;
  position: relative;

  &.is-active {
    border-color: #ee2e2d;
    z-index: 1;
  }
}
</style>
