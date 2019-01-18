<template lang="pug">
	.vp-modal__inner
		h2.vp-modal__h2 We're sorry to see you go!
		.vp-modal__text Please let us know your reason for cancelling your subscription.
		.vp-modal__fields
			.vp-modal__field(
				v-for="(item, index) in reasonsList"
				:key="index"
			)
				input.vp-modal__radio(
					type="radio"
					v-model="reason"
					:value="item"
				)
				label.vp-modal__label {{ item }}
			.vp-modal__field.vp-modal__field--textArea
				label.vp-modal__label.vp-modal__label--textArea Comments
				input.vp-modal__textArea(
					type="textarea"
					v-model="comments"
				)
		.vp-modal__buttons
			a.vp-modal__button.u-btn.u-btn--greenLight(
				@click="cancelModal"
			) Submit

</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
const reasonsList = [
  "This is too expensive",
  "I don't want a subscription",
  "I already have more than I need",
  "I haven't noticed any benefit",
  "I'm moving or traveling",
  "I don't like the taste",
  "I have a medical reason",
  "Other reason"
];
export default {
  data() {
    return {
      reasonsList: reasonsList,
      reason: null,
      comments: null
    };
  },
  methods: {
    ...mapGetters(["activeDeliveryDate", "deliverySettings"]),
    ...mapMutations("ui", ["closeModal"]),
    ...mapActions("deliveries", ["skipDelivery"]),
    ...mapActions("subscriptions", ["cancelAllSubscriptions"]),
    canSkip() {
      const maxDate = moment()
        .add(120, "days")
        .toDate();
      const nextDate = moment(this.activeDeliveryDate).add(
        this.deliverySettings.deliveryInterval,
        "days"
      );
      return maxDate - nextDate > 0;
    },
    async cancelModal() {
      await this.cancelAllSubscriptions({
        reason: this.reason,
        comments: this.comments
      });
      this.closeModal();
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/settings";

.vp-modal__text {
  margin: 20px 0;
  text-align: center;
}
.vp-modal__email {
  font-size: 20px;
  font-family: $font-avenir-medium;
}
.vp-modal__buttons {
  margin-top: 30px;
  display: flex;
}
.vp-modal__button {
  margin: 0 10px;
  color: $color-white !important;
}
.vp-modal__fields {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.vp-modal__field {
  display: flex;
  width: 100%;
  max-width: 400px;
  margin-bottom: 15px;
}
.vp-modal__field--textArea {
  display: block;
  margin-bottom: 0;
}
.vp-modal__radio {
  width: auto;
}
.vp-modal__label {
  width: 100%;
  margin-left: 20px;
}
.vp-modal__label--textArea {
  width: 100%;
  margin-bottom: 5px;
  margin-left: 0;
}
.vp-modal__radio {
  appearance: radio;
  margin-bottom: 10px;
}
.vp-modal__comments {
  appearance: radio;
}
.vp-modal__textArea {
  appearance: textarea;
}
</style>