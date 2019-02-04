<template>
  <div>
    <div v-if="addressMode === 'default'">
      <span class="c-rDrawer__title">Shipping Addresses</span>
      <div class="c-rAddressList">
        <div
          class="c-rAddressList__item"
          v-for="(address, index) in addresses"
          :key="index"
        >
          <div
            class="c-rOption"
            :class="{
              'is-active':
                !isEmptyObject(localActiveAddress) &&
                localActiveAddress.id == address.id
            }"
          >
            <span class="c-rOptionText c-rOptionText--1">{{
              address.address1
            }}</span>
            <span class="c-rOptionText c-rOptionText--2">
              {{ address.address2 }}, {{ address.city }},
              {{ address.province }}
              {{ address.zip }}
              {{ address.country }}
            </span>

            <div class="c-rOptionCheck">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 26 26"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                enable-background="new 0 0 26 26"
              >
                <path
                  d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"
                />
              </svg>
            </div>
          </div>

          <a
            class="c-rAddressList__itemEditAddress"
            @click.prevent="editAddressMode(address)"
          >
            <svg
              enable-background="new 0 0 128 128"
              height="128px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 128 128"
              width="128px"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="M123.315,16L112.003,4.686C108.878,1.563,104.78,0,100.687,0s-8.188,1.563-11.313,4.686l-68.69,68.689  C17.563,76.5,8.004,88.586,8,92.68L0,128l35.313-8c0,0,16.188-9.563,19.313-12.688l68.69-68.687  C129.562,32.375,129.562,22.243,123.315,16z M10.605,117.398l5.195-22.953c0.074-0.328,0.129-0.664,0.16-0.992  c0.016-0.047,0.059-0.117,0.078-0.164l18.09,18.094c-0.605,0.367-1.215,0.734-1.813,1.094L10.605,117.398z M48.984,101.641  c-0.906,0.859-4.039,2.977-7.867,5.414L20.391,86.328c2.125-2.914,4.492-5.844,5.949-7.297l51.722-51.718l22.625,22.625  L48.984,101.641z M117.659,32.969l-11.316,11.313L83.718,21.657l11.316-11.313C96.542,8.829,98.55,8,100.687,8  s4.148,0.836,5.66,2.344l11.313,11.313c1.512,1.508,2.34,3.516,2.34,5.656C119.999,29.446,119.167,31.461,117.659,32.969z"
                fill="#000"
              />
            </svg>
            <span>Edit</span>
          </a>
        </div>
      </div>
    </div>

    <div v-if="addressMode === 'edit'">
      <div class="c-rForm">
        <span class="c-rDrawer__title">Edit Address</span>

        <div class="c-rForm__inputWrapper c-rForm__inputWrapper--half">
          <input
            class="c-rForm__input"
            type="text"
            placeholder="Last Name"
            v-model="updateFirst_name"
          />

          <input
            class="c-rForm__input"
            type="text"
            placeholder="First Name"
            v-model="updateLast_name"
          />
        </div>

        <div class="c-rForm__inputWrapper c-rForm__inputWrapper--full">
          <select
            name="countries"
            class="c-rForm__input"
            placeholder="Country"
            v-model="updateCountry"
          >
            <option disabled value="">Country</option>
            <option value="United States">United States</option>
          </select>
        </div>

        <div class="c-rForm__inputWrapper c-rForm__inputWrapper--half">
          <input
            class="c-rForm__input"
            type="text"
            placeholder="Address"
            v-model="updateAddress1"
          />

          <input
            class="c-rForm__input"
            type="text"
            placeholder="Apt/Suite"
            v-model="updateAddress2"
          />
        </div>

        <div class="c-rForm__inputWrapper c-rForm__inputWrapper--full">
          <input
            class="c-rForm__input"
            type="text"
            placeholder="Company"
            v-model="updateCompany"
          />
        </div>

        <div class="c-rForm__inputWrapper c-rForm__inputWrapper--half">
          <input
            class="c-rForm__input"
            type="text"
            placeholder="City"
            v-model="updateCity"
          />

          <select class="c-rForm__input" v-model="updateProvince">
            <option disabled value="">State</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>

        <div class="c-rForm__inputWrapper c-rForm__inputWrapper--half">
          <input
            class="c-rForm__input"
            type="text"
            placeholder="Postal Code"
            v-model="updateZip"
          />

          <input
            class="c-rForm__input"
            type="text"
            placeholder="Phone (Optional)"
            v-model="updatePhone"
          />
        </div>
      </div>

      <div class="c-rDrawer__actionBox">
        <a class="c-rButton c-rButton--red" @click.prevent="updateAddress()">
          <span>Save Address</span>
        </a>
      </div>
    </div>

    <div class="c-rDrawer__updateMessage" v-if="addressUpdating">
      <span
        v-if="!isEmptyObject(addressUpdateErrors)"
        class="c-rDrawer__updateMessageText"
      >
        <span
          class="c-rForm__errorMessage"
          v-for="(error, index) in addressUpdateErrors"
          :key="index"
          >{{ error[0] }}</span
        >
      </span>

      <span v-else class="c-rDrawer__updateMessageText">Updating...</span>
    </div>

    <div class="c-rDrawer__updateMessage" v-if="addressSaved" transition="fade">
      <span
        class="c-rDrawer__updateMessageText c-rDrawer__updateMessageText--success"
        >SAVED</span
      >
      <div class="c-rDrawer__updateMessageIcon--save">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 26 26"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          enable-background="new 0 0 26 26"
        >
          <path
            d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'DrawerShippingAddresses',

  props: {
    // product: {
    //     type: Object,
    //     required: true
    // }
  },

  data: function() {
    return {
      addressMode: 'default',
      localActiveAddress: {},

      initialFirst_name: null,
      initialLast_name: null,
      initialAddress1: null,
      initialAddress2: null,
      initialCompany: null,
      initialCountry: null,
      initialProvince: null,
      intialCity: null,
      initialZip: null,
      // initialState: null,
      initialPhone: null,

      updateFirst_name: null,
      updateLast_name: null,
      updateAddress1: null,
      updateAddress2: null,
      updateCompany: null,
      updateCountry: null,
      updateProvince: null,
      updateCity: null,
      updateZip: null,
      // updateState: null,
      updatePhone: null
    }
  },

  mounted() {
    this.localActiveAddress = this.activeDeliveryAddress

    this.setAddressSaved(false)
    this.setAddressUpdating(false)

    this.updateAddressStatesToLocal()
  },

  computed: {
    ...mapState([
      'drawerContentType',
      'activeDeliveryAddressId',
      'activeDeliveryAddress',

      'activeFirstDeliverySubscription',
      'addresses',
      'addressSaved',
      'addressUpdating',
      'addressUpdateErrors'
    ]),

    addressIndex() {
      let addressIndex = null

      this.addresses.forEach((address, index) => {
        if (address.id === this.localActiveAddress.id) {
          addressIndex = index
        }
      })

      return addressIndex
    }
  },

  watch: {
    addressIndex: {
      immediate: true,
      handler: function() {
        this.updateAddressStatesToLocal()
      }
    }
  },

  methods: {
    ...mapMutations([
      'setDrawerContentType',
      'closeDrawer',
      'openDrawer',
      'toggleDrawer',

      'setAddressSaved',
      'setAddressUpdating'
    ]),

    ...mapActions([
      'updateAddressAction',
      'updateAddressOnSubscriptionsAction'
    ]),

    updateAllCurrentProductsToNewAddress(address) {
      let payload = {
        subscriptions: this.addresses[this.addressIndex].subscriptions,
        address: address
      }

      this.updateAddressOnSubscriptionsAction(payload)
    },

    updateAddressStatesToLocal() {
      console.log('update Address local')
      this.initialFirst_name = this.localActiveAddress.first_name
      this.initialLast_name = this.localActiveAddress.last_name
      this.initialAddress1 = this.localActiveAddress.address1
      this.initialAddress2 = this.localActiveAddress.address2
      this.initialCompany = this.localActiveAddress.company
      this.initialCountry = this.localActiveAddress.country
      this.initialProvince = this.localActiveAddress.province
      this.initialZip = this.localActiveAddress.zip
      this.initialCity = this.localActiveAddress.city
      this.initialPhone = this.localActiveAddress.phone

      this.updateFirst_name = this.localActiveAddress.first_name
      this.updateLast_name = this.localActiveAddress.last_name
      this.updateAddress1 = this.localActiveAddress.address1
      this.updateAddress2 = this.localActiveAddress.address2
      this.updateCompany = this.localActiveAddress.company
      this.updateCountry = this.localActiveAddress.country
      this.updateProvince = this.localActiveAddress.province
      this.updateZip = this.localActiveAddress.zip
      this.updateCity = this.localActiveAddress.city
      this.updatePhone = this.localActiveAddress.phone
    },

    updateAddress() {
      let updateAddress = {
        first_name: this.updateFirst_name,
        last_name: this.updateLast_name,
        address1: this.updateAddress1,
        address2: this.updateAddress2,
        company: this.updateCompany,
        country: this.updateCountry,
        province: this.updateProvince,
        city: this.updateCity,
        zip: this.updateZip,
        state: this.updateState,
        phone: this.updatePhone
      }

      let payload = {
        addressToUpdateId: this.localActiveAddress.id,
        addressIndex: this.addressIndex,
        addressUpdates: updateAddress
      }

      this.updateAddressAction(payload)
    },

    selectLocalActiveAddress(address) {
      this.localActiveAddress = address
    },

    addAddressMode() {
      this.addressMode = 'add'
    },

    editAddressMode(address) {
      this.selectLocalActiveAddress(address)
      this.addressMode = 'edit'
    },

    defaultAddressMode() {
      this.addressMode = 'default'
    },

    submitForm() {
      this.$refs.form.submit()
    }
  }
}
</script>

<style lang="scss">
.c-rAddressList__item {
  display: grid;
  display: grid;
  grid-template-columns: 1fr 30px;
  grid-column-gap: 14px;
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.c-rAddressList__itemEditAddress {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    color: #000;

    span {
      color: #000;
    }
  }

  svg {
    height: 20px;
    width: 20px;
    margin-bottom: 2px;
  }

  span {
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0;
  }
}
</style>
