import moment from 'moment'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['activeDeliveryFrequency']),
    ...mapGetters([
      'activeDeliveryChargeScheduledAt',
      'activeDeliveryScheduleGetter'
    ]),

    nextShipmentDates() {
      const currentSubscription = this.activeDeliveryScheduleGetter,
        date = new Date(this.activeDeliveryChargeScheduledAt),
        frequency = this.activeDeliveryFrequency
      const interval =
        currentSubscription.delivery[0].subscription.charge_interval_unit

      return [
        this.getNextDate(date, null, null),
        this.getNextDate(date, parseInt(frequency), interval)
      ]
    }
  },

  methods: {
    getNextDate(date, frequency, interval) {
      return moment(date)
        .add(frequency, interval)
        .format('MMMM Do, YYYY')
    }
  }
}
