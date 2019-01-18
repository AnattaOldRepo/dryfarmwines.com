<template lang="pug">
	.vp-drawer__inner
		.vp-drawer__header
			h2.vp-h2.vp-drawer__h2 Edit Shipping
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
					span.vp-address__text.vp-address__text--large {{ cleanShipping.line1 }}
					span.vp-address__text(
						v-if="cleanShipping.line2"
					) {{ cleanShipping.line2 }}
					span.vp-address__text(
						v-if="cleanShipping.company"
					) {{ cleanShipping.company }}
					span.vp-address__text {{ cleanShipping.cityStateZip }} {{ cleanShipping.country }}
					span.vp-address__text(
						v-if="cleanShipping.phone"
					) {{ cleanShipping.phone }}
				button.vp-drawer__button.u-btn.u-btn--greenLight(
					@click="toggleEditMode"
				) Edit Address
			DrawerShippingForm(
				v-if="editMode"
				:address="activeAddress"
				@saved="markSaved"
			)
</template>

<script>
import DrawerShippingForm from "./DrawerShippingForm.vue";
import { mapGetters, mapMutations } from "vuex";
import { cleanAddress } from "../../assets/js";
import { checkBadge } from "../../assets/svg";
export default {
  components: {
    DrawerShippingForm
  },
  data() {
    return {
      saved: false,
      editMode: false,
      checkBadge
    };
  },
  computed: {
    ...mapGetters("addresses", ["activeAddress"]),
    cleanShipping() {
      return cleanAddress(this.activeAddress);
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