<template lang="pug">
	.vp-drawer__inner
		.vp-drawer__header
			h2.vp-h2.vp-drawer__h2 Edit Billing Address
		.vp-drawer__saved(
			v-if="saved"
		)
			span.vp-drawer__savedIcon(
				v-html="checkBadge"
			)
			.vp-drawer__savedText Address Saved
		.vp-drawer__content
			.vp-active__address(
				v-if="!editMode"
			)
				.vp-address__box
					span.vp-address__check(
						v-html="checkBadge"
					)
					span.vp-address__text.vp-address__text--large {{ cleanBilling.line1 }}
					span.vp-address__text {{ cleanBilling.vpityStateZip }} {{ cleanBilling.vpountry }}
				button.vp-drawer__button.u-btn.u-btn--greenLight(
					@click="toggleEditMode"
				) Edit Address
			DrawerBillingForm(
				v-if="editMode"
				:address="billingAddress"
				@saved="markSaved"
			)
</template>

<script>
import DrawerBillingForm from "./DrawerBillingForm.vue";
import { mapGetters, mapMutations } from "vuex";
import { cleanAddress } from "../../assets/js";
import { checkBadge } from "../../assets/svg";
export default {
  components: {
    DrawerBillingForm
  },
  data() {
    return {
      saved: false,
      editMode: false,
      checkBadge
    };
  },
  computed: {
    ...mapGetters("customer", ["billingAddress"]),
    cleanBilling() {
      return cleanAddress(this.billingAddress, "billing");
    }
  },
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    markSaved() {
      this.saved = true;
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/settings";

.vp-address__box {
  width: 100%;
  position: relative;
  text-align: center;
  background-color: $color-white;
  padding: 24px 20px 20px;
  margin: 10px auto 20px;
  border: 2px solid $color-greenLight;
  border-radius: 5px;
}
.vp-address__check {
  position: absolute;
  top: -15px;
  left: calc(50% - 15px);
  display: block;
  width: 30px;
  height: 30px;
  z-index: 0;
  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 28px;
    height: 28px;
    background-color: $color-white;
    border-radius: 50%;
    z-index: -1;
  }
  & >>> svg {
    width: 100%;
    height: 100%;
  }
}
.vp-address__text {
  font-family: $font-avenir;
  display: block;
  font-size: 13px;
  text-transform: capitalize;
}
.vp-address__text--large {
  font-size: 18px;
  font-family: $font-avenir-medium;
  font-weight: 500;
  text-transform: uppercase;
}
</style>