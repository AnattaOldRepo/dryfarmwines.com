<template>
  <div
    class="c-rDrawerEditShipDate"
    :class="{ 'pikaday-hideaway': dateOutsideRestriction }"
  >
    <span class="c-rDrawer__title">Ships On</span>

    <input
      id="datepicker-input"
      style="height: 0; width: 0; padding: 0; background-color: transparent; color: twhite; border: none;"
      :value="date"
    />

    <div
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
    </div>

    <div v-else>
      <p class="c-rDrawer__text c-rDrawer__text--med c-rDrawer__text--red">
        Click on date on calendar to change shipment date.
      </p>
      <p class="c-rDrawer__text">
        You may move your shipment date ahead or delay up to 60 days.
      </p>
    </div>

    <hr />

    <span class="c-rDrawer__title c-rDrawer__title--nextShipment">next shipments</span>
    <p
      class="c-rDrawer__text c-rDrawer__text--med"
      v-for="date in nextShipmentDates"
      :key="date"
    >
      {{ date }}
    </p>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import dates from '@/mixins/dates'
import Pikaday from 'pikaday'
import moment from 'moment'

export default {
  data: () => ({
    date: null,
    nextShipDate: '',
    dateOutsideRestriction: false
  }),

  props: {
    saved: {
      type: Boolean,
      default: false
    }
  },

  mixins: [dates],

  mounted() {
    this.date = this.activeDeliveryScheduleGetter.delivery[0].subscription.next_charge_scheduled_at.split(
      'T'
    )[0]

    this.$nextTick(() => {
      const minDate = moment()
        .add(1, 'days')
        .toDate()
      const maxDate = moment()
        .add(60, 'days')
        .toDate()

      this.dateOutsideRestriction =
        moment(this.date, 'YYYY-MM-DD').diff(maxDate) > 0

      const picker = new Pikaday({
        field: document.getElementById('datepicker-input'),
        format: 'YYYY-MM-DD',
        bound: false,
        onSelect: () => {
          this.date = picker.toString()
          this.changeShipmentDate()
        },
        minDate: moment()
          .add(1, 'days')
          .toDate(),
        maxDate: moment()
          .add(60, 'days')
          .toDate(),

        showDaysInNextAndPreviousMonths: true,
        enableSelectionDaysInNextAndPreviousMonths: false,

        i18n: {
          previousMonth: 'Previous Month',
          nextMonth: 'Next Month',
          months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          weekdays: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          weekdaysShort: ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa']
        }
      })
    })
  },

  computed: {
    ...mapState([
      'drawerOpen',
      'drawerContentType',
      'activeDeliveryAddressId',
      'shipsOnUpdating',
      'shipsOnSaved'
    ])
  },

  methods: {
    ...mapMutations([
      'setDrawerContentType',
      'closeDrawer',
      'openDrawer',
      'toggleDrawer',
      'setShipsOnUpdating',
      'setShipsOnSaved'
    ]),

    ...mapActions(['changeShipmentDateAction']),

    changeShipmentDate() {
      this.dateOutsideRestriction = false

      let payload = {
        subscriptionIds: [],
        newDate: moment(this.date).format('YYYY-MM-DD'),
        callbackType: 'edit-ships-on'
      }

      this.activeDeliveryScheduleGetter.delivery.forEach(delivery => {
        payload.subscriptionIds.push(delivery.subscription.id)
      })

      this.changeShipmentDateAction(payload)
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

<style lang="scss">
// Keep this not scoped
@import '~styles/components/drawer-edit-ship-date';
</style>
