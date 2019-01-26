<template>
  <div>
    <!-- <div>
        <span class="c-rDrawer__title">Billing Address</span>
        <div class="c-rAddressList">
            <div class="c-rAddressList__item">

                
                <div class="c-rOption is-active">
                    <span class="c-rOptionText c-rOptionText--1">{{ customer.billing_address1 }}</span>
                    <span class="c-rOptionText c-rOptionText--2">
                        {{ customer.billing_address2 }},
                        {{ customer.billing_company }},
                        {{ customer.billing_city }},
                        {{ customer.billing_province }},
                        {{ customer.billing_zip }},
                        {{ customer.billing_country }}
                    </span>

                    <div class="c-rOptionCheck">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 26 26">
                        <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"/>
                        </svg>
                    </div>
                </div>

                <a class="c-rAddressList__itemEditAddress"
                    @click.prevent="editBillingAddress()"               
                >
                    <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <defs>
                            <path d="M20.8211683,3.179 C20.0611683,2.418 19.0491683,2 17.9741683,2 C16.9001683,2 15.8881683,2.418 15.1281683,3.179 L3.71916832,14.587 C3.71916832,14.587 3.71816832,14.59 3.71616832,14.591 C3.63516832,14.673 3.49716832,14.889 3.45516832,15.052 L2.03016832,20.756 C1.94416832,21.096 2.04516832,21.458 2.29316832,21.705 L2.29416832,21.706 L2.29516832,21.707 C2.54316832,21.955 2.90316832,22.056 3.24416832,21.971 L8.94816832,20.544 C9.11116832,20.502 9.32816832,20.364 9.40916832,20.283 C9.41016832,20.282 9.41316832,20.28 9.41316832,20.28 L20.8221683,8.873 C21.5821683,8.112 22.0011683,7.102 22.0001683,6.026 C22.0001683,4.951 21.5821683,3.94 20.8221683,3.179 L20.8211683,3.179 Z M14.4111683,6.728 L17.2741683,9.591 L8.70616832,18.159 L5.84316832,15.296 L14.4111683,6.728 Z M4.37516832,19.626 L4.97016832,17.252 L6.75016832,19.033 L4.37516832,19.626 Z M19.4091683,4.594 C20.1731683,5.359 20.1731683,6.693 19.4091683,7.458 L18.6901683,8.178 L15.8241683,5.313 L16.5451683,4.594 C17.3101683,3.83 18.6441683,3.829 19.4091683,4.594 Z" id="path-1"></path>
                        </defs>
                        <g id="Account-Page" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="shipping-address-page" transform="translate(-1388.000000, -241.000000)">
                                <g id="shipping-addresses-slide-out" transform="translate(1040.000000, 0.000000)">
                                    <g id="EDIT" transform="translate(344.000000, 239.000000)">
                                        <g id="Icon/Edit" transform="translate(2.000000, 0.000000)">
                                            <rect id="Bounding-Box" x="0" y="0" width="24" height="24"></rect>
                                            <mask id="mask-2" fill="white">
                                                <use xlink:href="#path-1"></use>
                                            </mask>
                                            <g id="Mask"></g>
                                            <g id="Mixin/Fill/Black" mask="url(#mask-2)" fill="#000000" fill-rule="evenodd">
                                                <rect id="Rectangle" x="0" y="0" width="24" height="24"></rect>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>   
                    <span>Edit</span>
                </a>

            </div>
        </div>
    </div> -->

    <div class="c-rForm">
      <span class="c-rDrawer__title">Billing Address</span>

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
        <input
          class="c-rForm__input"
          type="email"
          placeholder="Email"
          v-model="updateEmail"
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
          <option value="Alabama">Alabama</option>
          <option value="Alaska">Alaska</option>
          <option value="Arizona">Arizona</option>
          <option value="Arkansas">Arkansas</option>
          <option value="California">California</option>
          <option value="Colorado">Colorado</option>
          <option value="Connecticut">Connecticut</option>
          <option value="Delaware">Delaware</option>
          <option value="District Of Columbia">District Of Columbia</option>
          <option value="Florida">Florida</option>
          <option value="Georgia">Georgia</option>
          <option value="Hawaii">Hawaii</option>
          <option value="Idaho">Idaho</option>
          <option value="Illinois">Illinois</option>
          <option value="Indiana">Indiana</option>
          <option value="Iowa">Iowa</option>
          <option value="Kansas">Kansas</option>
          <option value="Kentucky">Kentucky</option>
          <option value="Louisiana">Louisiana</option>
          <option value="Maine">Maine</option>
          <option value="Maryland">Maryland</option>
          <option value="Massachusetts">Massachusetts</option>
          <option value="Michigan">Michigan</option>
          <option value="Minnesota">Minnesota</option>
          <option value="Mississippi">Mississippi</option>
          <option value="Missouri">Missouri</option>
          <option value="Montana">Montana</option>
          <option value="Nebraska">Nebraska</option>
          <option value="Nevada">Nevada</option>
          <option value="New Hampshire">New Hampshire</option>
          <option value="New Jersey">New Jersey</option>
          <option value="New Mexico">New Mexico</option>
          <option value="New York">New York</option>
          <option value="North Carolina">North Carolina</option>
          <option value="North Dakota">North Dakota</option>
          <option value="Ohio">Ohio</option>
          <option value="Oklahoma">Oklahoma</option>
          <option value="Oregon">Oregon</option>
          <option value="Pennsylvania">Pennsylvania</option>
          <option value="Rhode Island">Rhode Island</option>
          <option value="South Carolina">South Carolina</option>
          <option value="South Dakota">South Dakota</option>
          <option value="Tennessee">Tennessee</option>
          <option value="Texas">Texas</option>
          <option value="Utah">Utah</option>
          <option value="Vermont">Vermont</option>
          <option value="Virginia">Virginia</option>
          <option value="Washington">Washington</option>
          <option value="West Virginia">West Virginia</option>
          <option value="Wisconsin">Wisconsin</option>
          <option value="Wyoming">Wyoming</option>
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
      <a
        class="c-rButton c-rButton--red"
        @click.prevent="updateBillingAddress()"
      >
        <span>Save Address</span>
      </a>

      <!-- <a class="c-rButton c-rButton--red"
            v-if="activeDeliveryAddressId !== localActiveAddress.id && localActiveAddress.subscriptions.length === 0"
        >
            <span>Remove Address</span>
        </a>                 -->
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
  name: 'DrawerEditBillingAddress',

  data: function() {
    return {
      localActiveAddress: {},

      initialFirst_name: null,
      initialLast_name: null,
      initialEmail: null,
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
      updateEmail: null,
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
    this.setAddressSaved(false)
    this.setAddressUpdating(false)

    this.updateAddressStates()
  },

  computed: {
    ...mapState([
      'drawerOpen',
      'drawerContentType',
      'customer',
      'customerHash',

      'activeDeliveryAddressId',
      'activeDeliveryAddress',

      'activeFirstDeliverySubscription',
      'addresses',
      'addressSaved',
      'addressUpdating',
      'addressUpdateErrors'
    ])
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

    ...mapActions(['updateBillingAddressAction']),

    updateAddressStates() {
      console.log('update billing Address states')
      this.initialFirst_name = this.customer.billing_first_name
      this.initialLast_name = this.customer.billing_last_name
      this.initialEmail = this.customer.email
      this.initialAddress1 = this.customer.billing_address1
      this.initialAddress2 = this.customer.billing_address2
      this.initialCompany = this.customer.billing_company
      this.initialCountry = this.customer.billing_country
      this.initialProvince = this.customer.billing_province
      this.initialZip = this.customer.billing_zip
      this.initialCity = this.customer.billing_city
      this.initialPhone = this.customer.billing_phone

      this.updateFirst_name = this.customer.billing_first_name
      this.updateLast_name = this.customer.billing_last_name
      this.updateEmail = this.customer.email
      this.updateAddress1 = this.customer.billing_address1
      this.updateAddress2 = this.customer.billing_address2
      this.updateCompany = this.customer.billing_company
      this.updateCountry = this.customer.billing_country
      this.updateProvince = this.customer.billing_province
      this.updateZip = this.customer.billing_zip
      this.updateCity = this.customer.billing_city
      this.updatePhone = this.customer.billing_phone
    },

    updateBillingAddress() {
      let updateAddress = {
        first_name: this.updateFirst_name,
        last_name: this.updateLast_name,
        email: this.updateEmail,
        address1: this.updateAddress1,
        address2: this.updateAddress2,
        company: this.updateCompany,
        country: this.updateCountry,
        province: this.updateProvince,
        city: this.updateCity,
        zip: this.updateZip,
        phone: this.updatePhone
      }

      let payload = {
        addressUpdates: updateAddress
      }

      console.log('payload billing', payload)

      this.updateBillingAddressAction(payload)
    },

    // change route to theme editor so we can submit the update
    editBillingAddress() {
      let editBillingAddressUrl = `https://www.dryfarmwines.com/tools/recurring/customer_portal/${
        this.customerHash
      }/edit/`

      editBillingAddressUrl += '?preview_theme=1792#/' // only for testing

      document.location = editBillingAddressUrl
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
