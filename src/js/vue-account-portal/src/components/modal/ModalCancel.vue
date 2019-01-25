<template lang="pug">
	.vp-modal__inner
		h2.vp-modal__h2 Wait!
		.vp-modal__text Are you sure you want to cancel your subscription?  You can always skip a shipment instead.
		.vp-modal__text Please call customer support #[a(class="vp-modal__phone" href="tel:1-888-390-4029") 1-888-390-4029] to see if we can help with your subscription.
		.vp-modal__buttons
			a.vp-modal__button.u-btn.u-btn--greenLight(
				@click="skipModal"
			) Skip shipment
			a.vp-modal__button.u-btn.u-btn--greenLight(
				@click="setModal('ModalCancelConfirm')"
			) Cancel Subscription

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  methods: {
    ...mapGetters(['activeDeliveryDate', 'deliverySettings']),
    ...mapMutations('ui', ['closeModal', 'setModal']),
    ...mapActions('deliveries', ['skipDelivery']),
    ...mapActions('subscriptions', ['cancelAllSubscriptions']),
    canSkip() {
      const maxDate = moment()
        .add(120, 'days')
        .toDate()
      const nextDate = moment(this.activeDeliveryDate).add(
        this.deliverySettings.deliveryInterval,
        'days'
      )
      return maxDate - nextDate > 0
    },
    async skipModal() {
      await this.skipDelivery()
      this.closeModal()
    },
    async cancelModal() {
      await this.cancelAllSubscriptions()
      this.closeModal()
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/settings';

.vp-modal__text {
  margin: 20px 0;
  text-align: center;
}
.vp-modal__email {
  font-size: 20px;
  font-family: $font-avenir-medium;
}
.vp-modal__phone {
  display: inline-block;
}
.vp-modal__buttons {
  margin-top: 30px;
  display: flex;
}
.vp-modal__button {
  margin: 0 10px;
  color: $white !important;
}
</style>
