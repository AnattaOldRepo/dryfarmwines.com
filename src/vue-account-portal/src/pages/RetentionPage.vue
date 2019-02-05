<template>
  <div class="c-rRetWrapper" style="padding-bottom: 60px;">
    <h1 class="c-rPageTitle" id="top-of-retention">Cancel Subscription</h1>

    <div class="c-rRetInner">
      <p class="c-rRet__text">
        Four Sigmatic’s priority is happy customers.<br />
        Please tell us your reason for cancelling.
      </p>

      <hr class="c-rRetHrMobile" />

      <div class="c-rRet__reasons c-rRet__reasons--mobile">
        <div
          class="c-rOption"
          :class="{ 'is-active': reason.id === selectedReason }"
          v-for="(reason, index) in reasons"
          :key="index"
          @click="selectReason(reason.id)"
        >
          <span class="c-rOptionText c-rOptionText--2">{{ reason.text }}</span>
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

      <div class="c-rRet__reasons c-rRet__reasons--desktop">
        <div
          class="c-rRet__reason"
          v-for="(reason, index) in reasons"
          :key="index"
          @click="selectReason(reason.id)"
        >
          <div class="c-rRet__reasonText">{{ reason.text }}</div>
          <div
            class="c-rRet__reasonSelect"
            :class="{ 'is-active': reason.id === selectedReason }"
          >
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

    <div class="c-rRet__actionBox">
      <a
        class="c-rButton c-rButton--red"
        @click.prevent="openDrawerEditShipDate"
      >
        <span>Change Shipping Date</span>
      </a>

      <a
        class="c-rButton c-rButton--red"
        @click.prevent="openDrawerRetentionEditProducts"
      >
        <span>Swap My Products</span>
      </a>

      <a
        class="c-rButton"
        :disabled="reasonSelected === false"
        :class="{ 'is-disabled': reasonSelected === false }"
        @click.prevent="cancelSubscriptions"
      >
        <span>Cancel Subscription</span>
      </a>
    </div>

    <div
      class="c-rDrawer__updateMessage"
      style="padding-bottom: 40px;"
      v-if="cancellationUpdating"
    >
      <span class="c-rDrawer__updateMessageText">Updating...</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Retention',

  components: {},

  props: {
    orders: {
      type: Array,
      required: true
    }
  },

  data: function() {
    return {
      selectedReason: null,
      reasons: [
        {
          text: 'I’m receiving too many products.',
          id: 124713
        },
        {
          text: 'My subscription is too expensive.',
          id: 124719
        },
        {
          text: 'I am not happy with the products.',
          id: 124731
        },
        {
          text: 'I want a different product.',
          id: 124752
        },
        {
          text: 'I have switched to another brand.',
          id: 124782
        },
        {
          text: 'I prefer to buy from another online source.',
          id: 124791
        },
        {
          text: 'I prefer to buy from the store.',
          id: 124809
        },
        {
          text: 'I planned on cancelling after a short time period.',
          id: 124815
        },
        {
          text: 'I’m having shipping issues.',
          id: 506773
        },
        {
          text: 'It’s something else.',
          id: 506774
        }
      ]
    }
  },

  mounted() {
    // Get an element's distance from the top of the page
    let getElemDistance = function(elem) {
      var location = 0
      if (elem.offsetParent) {
        do {
          location += elem.offsetTop
          elem = elem.offsetParent
        } while (elem)
      }
      return location >= 0 ? location : 0
    }
    let elem = document.querySelector('#top-of-retention')
    let location = getElemDistance(elem)

    window.scrollTo(0, location)
  },

  computed: {
    ...mapState(['activeDeliverySchedule', 'cancellationUpdating']),

    ...mapGetters(['activeDeliveryScheduleGetter']),

    reasonSelected() {
      return this.selectedReason !== null
    }
  },

  methods: {
    ...mapMutations([
      'setDrawerContentType',
      'openDrawer',
      'setCancellationUpdating'
    ]),

    ...mapActions(['cancelSubscriptionAction']),

    selectReason(reason) {
      this.selectedReason = reason
    },

    cancelSubscriptions() {

      if (this.selectedReason !== null) {
        this.setCancellationUpdating(true)

        let activeDeliverySchedule = this.activeDeliveryScheduleGetter
        let activeDeliveryScheduleCount = this.activeDeliveryScheduleGetter
          .delivery.length

        let payload = {
          subscriptionIds: [],
          subscriptionTitles: '',
          frequencyText: '',
          reasonToCancel: this.selectedReason
        }

        this.activeDeliveryScheduleGetter.delivery.forEach(
          (delivery, index) => {
            payload.subscriptionIds.push(delivery.subscription.id)

            // if first one
            if (activeDeliveryScheduleCount === 1 || index === 0) {
              payload.subscriptionTitles += delivery.subscription.product_title
            }

            // if last one
            else if (index == activeDeliveryScheduleCount) {
              payload.subscriptionTitles += `and ${
                delivery.subscription.product_title
              }`
            } else {
              payload.subscriptionTitles += `, ${
                delivery.subscription.product_title
              }`
            }
          }
        )

        payload.frequencyText = `${
          this.activeDeliveryScheduleGetter.delivery[0].subscription
            .order_interval_frequency
        } ${
          this.activeDeliveryScheduleGetter.delivery[0].subscription
            .order_interval_unit
        }s`

        this.cancelSubscriptionAction(payload)
      }
    },

    openDrawerEditShipDate() {
      this.setDrawerContentType('editShipDate')
      this.openDrawer()
    },

    openDrawerRetentionEditProducts() {
      this.setDrawerContentType('retentionEditProducts')
      this.openDrawer()
    }
  }
}
</script>

<style lang="scss">
.c-rPageTitle {
  font-weight: 400;
  font-size: 19px;
  line-height: 29px;
  letter-spacing: 2px;
  margin: 0;
  padding: 54px 0 32px;
  border: none;
}

.c-rRetInner {
  max-width: 600px;
  margin: 0 auto 30px;
  padding: 23px 50px 2px;
  background-color: #f7f7f7;

  @media (max-width: 767px) {
    padding: 64px 30px 2px;
  }
}

.c-rRet__text {
  font-weight: 400;
  color: #ee2e2d;
  font-size: 19px;
  line-height: 30px;
  letter-spacing: 0;
  margin-bottom: 58px;
  text-align: center;

  @media (max-width: 767px) {
    padding: 0 20px;
    br {
      // display: none;
    }
  }
}

.c-rRetHrMobile {
  display: none;

  @media (max-width: 767px) {
    display: block;
    width: calc(100% + 60px);
    margin-left: -30px;
    margin-right: -30px;
    color: #dcdcdc;
  }
}

.c-rRet__reasons {
  &.c-rRet__reasons--desktop {
    @media (max-width: 767px) {
      display: none;
    }
  }

  &.c-rRet__reasons--mobile {
    padding-top: 58px;
    padding-bottom: 40px;

    @media (min-width: 768px) {
      display: none;
    }

    .c-rOption {
      min-height: 72px;
      padding: 8px 34px;
      margin-bottom: 27px;
    }
  }
}

.c-rRet__reason {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 29px;
  padding-right: 38px;
  cursor: pointer;
}

.c-rRet__reasonText {
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0;
}

.c-rRet__reasonSelect {
  border-radius: 50px;
  border: 3px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 15px;
  text-transform: uppercase;
  cursor: pointer;

  &.is-active {
  }

  &:hover {
    // border-color: #7FC464;
  }

  &.is-active {
    border-color: #7fc464;
    background-color: #7fc464;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    svg {
      display: block;
      fill-color: white;
      fill: white;
      margin-left: -1px;
      margin-bottom: -1px;
    }
  }

  svg {
    display: none;
    position: absolute;
    left: 9px;
    top: 7px;
    border-radius: 100px;
    color: #fff;
    width: 16px;
    height: 16px;
  }
}

.c-rRet__actionBox {
  max-width: 940px;
  margin: 0 auto 40px;
  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - 13.33px));
  grid-column-gap: 20px;
  padding: 0 20px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    padding: 40px;
    max-width: 370px;
    grid-row-gap: 8px;
    margin-bottom: 20px;
  }

  .c-rButton {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .c-rButton {
    margin-bottom: 10px;
    padding: 12px 0;

    &:disabled,
    &.is-disabled {
      background-color: #f0f0f0;
      border-color: #f0f0f0;
      cursor: default;

      &:hover,
      &:focus,
      &:active {
        color: #fff !important;
        background-color: #f0f0f0;
        border-color: #f0f0f0;
        padding-left: 0 !important;

        span {
          color: #fff;
        }
      }
    }
  }
}
</style>
