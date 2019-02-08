<template>
  <div class="c-rDrawerEditShipDate">
    <span class="c-rDrawer__title">Ships On</span>

    <!-- <div
      class="c-rDrawer__updateMessage"
      v-if="shipsOnUpdating"
    >
      <span class="c-rDrawer__updateMessageText">Updating...</span>
    </div>

    <div
      class="c-rDrawer__updateMessage"
      v-else-if="shipsOnSaved"
      transition="fade"
    >
      <span class="c-rDrawer__updateMessageText c-rDrawer__updateMessageText--success">SAVED</span>
      <div class="c-rDrawer__updateMessageIcon--save">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 26 26"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          enable-background="new 0 0 26 26"
        >
          <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z" />
        </svg>
      </div>
    </div> -->

    <!-- <div v-else>
      <p class="c-rDrawer__text c-rDrawer__text--med c-rDrawer__text--red">
        Click on date on calendar to change shipment date.
      </p>
      <p class="c-rDrawer__text">
        You may move your shipment date ahead or delay up to 60 days.
      </p>
    </div> -->

    <div class="c-shipsOnDate u-textCenter">{{ moment(nextShipmentDates[0], 'MMMM Do, YYYY').format('MMMM D, YYYY') }}</div>

    <div class="u-textCenter">Want to skip a shipment?</div>

    <base-button
      class="c-skipAShipmentButton"
      @click="skipShipment"
      v-if="!skipShipmentUpdating && !skipShipmentSaved"
      center
    >
      Yes, Skip a Shipment
    </base-button>

    <hr />

    <span class="c-rDrawer__title c-rDrawer__title--nextShipment">next shipments</span>
    <div
      class="c-rDrawer__text c-rDrawer__text--med"
      v-for="date in nextShipmentDates"
      :key="date"
    >
      {{ date }}
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import dates from '@/mixins/dates'
import moment from 'moment'

export default {
  data: () => ({
    date: null,
    nextShipDate: '',
    dateOutsideRestriction: false,
    moment
  }),

  props: {
    saved: {
      type: Boolean,
      default: false
    }
  },

  mixins: [dates],

  computed: {
    ...mapState([
      'drawerOpen',
      'drawerContentType',
      'shipsOnUpdating',
      'shipsOnSaved'
    ])
  },

  methods: {
    ...mapActions(['skipShipmentAction']),

    ...mapMutations([
      'setDrawerContentType',
      'closeDrawer',
      'openDrawer',
      'toggleDrawer',
      'setShipsOnUpdating',
      'setShipsOnSaved'
    ]),

    skipShipment() {
      let payload = {
        date: this.activeDeliveryChargeScheduledAt.split('T')[0],
        item_ids: [],
        charge_id: this.activeDeliveryScheduleGetter.delivery[0].charge_id
      }

      // console.log(this.activeDeliveryChargeScheduledAt)
      // console.log(this.activeDeliveryChargeScheduledAt.split('T')[0])

      this.activeDeliveryScheduleGetter.delivery.forEach(delivery => {
        payload.item_ids.push(delivery.subscription.id)
      })

      this.skipShipmentAction(payload)
    },

    closeDrawerAndResetType() {
      this.closeDrawer()
      setTimeout(() => {
        this.resetType(false)
      }, 301)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/components/drawer-skip-a-shipment';
</style>
