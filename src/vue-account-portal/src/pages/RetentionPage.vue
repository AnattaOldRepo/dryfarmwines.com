<template>
  <div
    class="c-rRetWrapper"
    style="padding-bottom: 60px;"
  >
    <h1
      class="c-rPageTitle"
      id="top-of-retention"
    >
      Cancel Subscription
    </h1>

    <p class="c-rRet__text">
      Dry Farm Wines’s priority is happy customers. Please tell us your reason for cancelling.
    </p>

    <hr class="c-rRetHrMobile" />

    <div class="c-rRetInner">

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
            <check-icon />
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
            <check-icon />
          </div>
        </div>
      </div>
    </div>

    <div class="c-rRet__actionBox">
      <base-button
        long-button
        @click="openDrawerEditShipDate"
      >
        Change Shipping Date
      </base-button>

      <base-button
        long-button
        @click="openDrawerRetentionEditProducts"
      >
        Swap My Products
      </base-button>

      <base-button
        :disabled="reasonSelected === false"
        long-button
        @click="cancelSubscriptions"
      >
        Cancel Subscription
      </base-button>
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
import CheckIcon from '@/components/icons/CheckIcon'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Retention',

  components: { CheckIcon },

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
  color: black;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  margin: 0;
  padding: 54px 0 32px;
  border: none;
}

.c-rRetInner {
  max-width: 580px;
  margin: 30px auto 30px;
  padding: 1.618em 2em;
  border: 1px solid $light-gray;

  @media (max-width: 767px) {
    padding: 1.618em 2em;
  }
}

.c-rRet__text {
  font-weight: 400;
  font-size: 19px;
  line-height: 30px;
  letter-spacing: 0;
  margin-bottom: 58px;
  max-width: 900px;
  text-align: center;
  margin: auto;

  @media (max-width: 767px) {
    padding: 0 20px;
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
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 12.5px;
  text-transform: uppercase;
  cursor: pointer;

  &.is-active {
    border-color: $primary-color;
    background-color: $primary-color;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    svg {
      display: block;
      fill: white;
      margin-left: -4px;
      height: 13px;
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
  grid-template-columns: 1fr 1fr 1fr;
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
