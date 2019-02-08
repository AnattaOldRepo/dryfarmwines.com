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

<style lang="scss" scoped>
@import '~styles/pages/retention-page';
</style>
