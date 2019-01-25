<template lang="pug">
	.vp-edit__address
		.vp-drawer__row.vp-field__group
			input.vp-field.vp-field--half(
				v-model="updateInfo.first_name"
				placeholder="First Name"
			)
			input.vp-field.vp-field--half(
				v-model="updateInfo.last_name"
				placeholder="Last Name"
			)
		.vp-drawer__row
			.vp-field
				input(
					v-model="updateInfo.address1"
					placeholder="Address Line 1"
				)
		.vp-drawer__row
			.vp-field
				input(
					v-model="updateInfo.address2"
					placeholder="Address Line 2"
				)
		.vp-drawer__row
			.vp-field
				input(
					v-model="updateInfo.company"
					placeholder="Company"
				)
		.vp-drawer__row
			.vp-field.vp-field--select
				select(
					v-model="updateInfo.country"
				)
					option(
						v-for="(country, index) in addressCountries"
						:value="country"
						:key="index"
					) {{ country }}
		.vp-drawer__row.vp-field__group
			.vp-field.vp-field--half
				input(
					v-model="updateInfo.vpity"
					placeholder="City"
				)
			.vp-field.vp-field--half.vp-field--select
				select(
					v-model="updateInfo.province"
				)
					option(
						v-for="(state, index) in addressStates"
						:key="index"
						:value="state.name"
					) {{ state.name }}
		.vp-drawer__row.vp-field__group
			.vp-field.vp-field--half
				input(
					v-model="updateInfo.zip"
					placeholder="Zip Code"
					pattern="[0-9]{5}"
				)
			.vp-field.vp-field--half
				input(
					v-model="updateInfo.phone"
					placeholder="Phone Number"
					type="tel"
				)
		button.vp-drawer__button.u-btn.u-btn--greenLight(
			@click="handleAddressUpdate"
		) Save Address
</template>

<script>
import { mapActions } from 'vuex'
import { addressCountries, addressStates } from '../../assets/js'
export default {
  props: {
    address: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      addressCountries,
      addressStates,
      updateInfo: {}
    }
  },
  methods: {
    ...mapActions('addresses', ['updateAddress']),
    handleAddressUpdate() {
      this.updateAddress(this.updateInfo)
    }
  },
  watch: {
    address() {
      this.$emit('saved')
    }
  },
  mounted() {
    const add = this.address
    this.updateInfo = {
      first_name: add.first_name,
      last_name: add.last_name,
      address1: add.address1,
      address2: add.address2,
      company: add.company,
      city: add.city,
      province: add.province,
      zip: add.zip,
      country: add.country,
      phone: add.phone
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/settings';

.vp-addressForm {
  width: 100%;
  margin-bottom: 15px;
}
.vp-addressFormRow {
  margin-bottom: 12px;
}
.vp-addressFormRow--split {
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 6px));
  grid-column-gap: 12px;
}
.vp-addressFormField {
  padding: 8px 10px 6px;
  width: 100%;
  border: 1px solid rgba(0, 40, 86, 0.5);
  color: $color-primary;
  font-family: $font-avenir;
  font-size: 15px;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    box-shadow: none !important;
    border: 1px solid $color-primary;
  }
}
</style>
