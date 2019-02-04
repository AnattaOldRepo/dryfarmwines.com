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
.c-rDrawerEditShipDate {
  padding: 0 14px;

  .c-rDrawer__updateMessage {
    margin: 22px auto 38px;
  }

  .c-rDrawer__title {
    margin-bottom: 2px;
  }

  .c-rDrawer__title--nextShipment {
    margin-top: 20px;
    margin-bottom: 6px;
  }

  .c-rDrawer__text {
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    text-align: center;

    &.c-rDrawer__text--red {
      color: #ee2e2d;
    }

    &.c-rDrawer__text--med {
      font-size: 16px;
      line-height: 25px;
      margin-bottom: 6px;
    }
  }
}

.pika-single {
  z-index: 9999;
  display: block;
  position: relative;
  color: #333;
  background: #fff;
  border-bottom-color: #bbb;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  border: none;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.125);
  margin-bottom: 20px;
}

.pika-single.is-hidden {
  display: none;
}

.pika-single.is-bound {
  position: absolute;
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5);
}

.pika-lendar {
  width: 240px;
  padding: 1em;
}

.pika-title {
  position: relative;
  text-align: center;
  padding-top: 5px;
  margin-bottom: 15px;
}

.pika-label {
  display: inline-block;
  *display: inline;
  position: relative;
  z-index: 9999;
  overflow: hidden;
  margin: 0;
  padding: 5px 3px;
  line-height: 20px;
  background-color: #fff;

  font-size: 19px;

  font-weight: 400;
  letter-spacing: 0;
}
.pika-title select {
  cursor: pointer;
  position: absolute;
  z-index: 9998;
  margin: 0;
  left: 0;
  top: 5px;
  filter: alpha(opacity=0);
  opacity: 0;
}

.pika-prev,
.pika-next {
  display: block;
  cursor: pointer;
  position: relative;
  outline: none;
  border: 0;
  padding: 0;
  width: 20px;
  height: 30px;
  /* hide text using text-indent trick, using width value (it's enough) */
  text-indent: 20px;
  white-space: nowrap;
  overflow: hidden;
  background-color: #fff;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 75% 75%;
  opacity: 0.5;
  *position: absolute;
  *top: 0;
}

.pika-prev:hover,
.pika-next:hover {
  background-color: #fff;
  opacity: 1;
}

.pika-prev,
.is-rtl .pika-next {
  float: left;
  background-image: url('data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAUklEQVR42u3VMQoAIBADQf8Pgj+OD9hG2CtONJB2ymQkKe0HbwAP0xucDiQWARITIDEBEnMgMQ8S8+AqBIl6kKgHiXqQqAeJepBo/z38J/U0uAHlaBkBl9I4GwAAAABJRU5ErkJggg==');
  *left: 0;
  margin-left: 18px;
}

.pika-next,
.is-rtl .pika-prev {
  float: right;
  background-image: url('data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAU0lEQVR42u3VOwoAMAgE0dwfAnNjU26bYkBCFGwfiL9VVWoO+BJ4Gf3gtsEKKoFBNTCoCAYVwaAiGNQGMUHMkjGbgjk2mIONuXo0nC8XnCf1JXgArVIZAQh5TKYAAAAASUVORK5CYII=');
  *right: 0;
  margin-right: 18px;
}

.pika-prev.is-disabled,
.pika-next.is-disabled {
  cursor: default;
  opacity: 0.2;
}

.pika-select {
  display: inline-block;
  *display: inline;
}

.pika-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border: 0;
  margin: 0;
}

.pika-table th,
.pika-table td {
  width: 14.285714285714286%;
  padding: 0;
  border: none;
  border-left: none !important;
}

.pika-table th {
  color: #000;
  font-size: 13px;
  line-height: 25px;
  font-weight: bold;
  text-align: center;
  border-right: none;
  background: none;

  font-weight: 400;
  opacity: 0.5;
  cursor: default;
  text-decoration: none;
}

.pika-button {
  cursor: pointer;
  display: block;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  border: 0;
  margin: 0;
  width: 100%;
  padding: 7px;
  background: #fff;
  border-radius: 50%;
  color: black;

  font-size: 16px;
  line-height: 19px;
  text-align: center;
  font-weight: 400;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  &:hover {
    color: #ffffff;
    opacity: 0.7;
    background: #ee2e2d;
  }
}

.pika-week {
  font-size: 11px;
  color: #999;
}

.is-today .pika-button {
  color: #33aaff;
  font-weight: bold;
}

.is-selected .pika-button,
.has-event .pika-button {
  color: #fff !important;
  font-weight: bold;
  background: #ee2e2d;
  border-radius: 50%;

  .pikaday-hideaway & {
    background: #fff;
    font-weight: normal;
    color: #000;
  }
}

.is-startrange .pika-button {
  color: #fff;
  background: #6cb31d;
  box-shadow: none;
  border-radius: 3px;
}

.is-endrange .pika-button {
  color: #fff;
  background: #33aaff;
  box-shadow: none;
  border-radius: 3px;
}

.is-disabled .pika-button {
  pointer-events: none;
  cursor: default;
  color: #999;
  opacity: 0.3;
}

.is-outside-current-month .pika-button {
  color: rgb(130, 130, 130);
  opacity: 0.3;
}

.is-selection-disabled {
  pointer-events: none;
  cursor: default;
}

.pika-table abbr {
  border-bottom: none;
  text-decoration: none;
  cursor: default;
}

.pika-table tr {
  border: none;

  &:first-child {
    border: none;
  }
}

.pika-title .pika-label:nth-of-type(2) {
  display: none;
}

.pika-lendar {
  width: auto;
}
</style>
