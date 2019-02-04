<template>
  <div>
    <div class="c-sub__initialContainer" v-if="initialRechargeDataLoading">
      <span class="c-sub__initialMessage">Loading...</span>
    </div>

    <div class="c-details" v-else>
      <div class="c-details__left">
        <!-- <base-card-wrapper title="Email & Password">
          <base-card-item title="Email Address">
            {{ customer.email }}
          </base-card-item>
          <base-card-item
            title="Password"
            @click="setAndOpenDrawer('changePassword')"
          >
            *******
          </base-card-item>
        </base-card-wrapper> -->

        <base-card-wrapper
          v-if="deliverySchedule.length"
          title="Your Subscription"
        >
          <base-card-item
            title="Delivery Every"
            @click="setAndOpenDrawer('editFrequency')"
          >
            <span class="u-text-large">
              {{ activeDeliveryFrequency }} {{ activeDeliveryIntervalUnit }}
            </span>
          </base-card-item>
        </base-card-wrapper>

        <div>
          <base-card-wrapper title="Payment Method">
            <base-card-item
              title="Payment Method"
              @click="setAndOpenDrawer('editPayment')"
            >
              <div
                class="c-details__card"
                v-if="
                  customer.customer_payment_type === 'credit' &&
                    customer.customer_card
                "
              >
                <img v-if="creditCardImage" :src="creditCardImage" />
                <span> *{{ customer.customer_card.last4 }}</span>
                <span
                  >{{ customer.customer_card.exp_month }}/{{
                    customer.customer_card.exp_year
                  }}</span
                >
              </div>

              <div
                class="c-details__card"
                v-if="customer.customer_payment_type === 'paypal'"
              >
                Paypal
              </div>
            </base-card-item>
          </base-card-wrapper>
          <div class="c-details__card" v-if="paypalEditInfoVisible">
            <span class="c-details__paypalInfo">
              <br />
              You need to login to
              <a
                target="_blank"
                href="https://www.paypal.com/us/cgi-bin/webscr?cmd=_login-run"
                >PayPal</a
              >
              to update your card. Here are detailed
              <a
                target="_blank"
                href="https://www.paypal.com/us/webapps/helpcenter/helphub/article/?solutionId=FAQ999&topicID=PAYING&m=TCI"
                >instructions</a
              >.
            </span>
          </div>
          <base-button component-is="a" :href="cardUrl" secondary>
            Edit Card
          </base-button>
        </div>
      </div>

      <div class="c-details__right">
        <base-card-wrapper v-if="shippingAddress" title="Shipping Address">
          <base-card-item
            title="Shipping Address"
            @click="setAndOpenDrawer('shippingAddresses')"
          >
            <div v-if="shippingAddress.first_name || shippingAddress.last_name">
              {{ shippingAddress.first_name || '' }}
              {{ shippingAddress.last_name || '' }}
            </div>
            <div v-if="shippingAddress.address1">
              {{ shippingAddress.address1 }}
            </div>
            <div v-if="shippingAddress.address2">
              {{ shippingAddress.address2 }}
            </div>
            <div v-if="shippingAddress.company">
              {{ shippingAddress.company }}
            </div>
            <div
              v-if="
                shippingAddress.city ||
                  shippingAddress.province ||
                  shippingAddress.zip
              "
            >
              {{ shippingAddress.city || '' }},
              {{ shippingAddress.province || '' }}
              {{ shippingAddress.zip || '' }}
            </div>
            <div v-if="shippingAddress.country">
              {{ shippingAddress.country }}
            </div>
            <div v-if="shippingAddress.phone">
              {{ shippingAddress.phone }}
            </div>
          </base-card-item>
        </base-card-wrapper>
        <base-card-wrapper title="Billing Address">
          <base-card-item
            title="Billing Address"
            component-is="a"
            :href="
              `${rechargeURL}${this.customerHash}/edit/${previewThemeQuery}`
            "
          >
            <div
              v-if="
                billingAddressGetter.first_name ||
                  billingAddressGetter.last_name
              "
            >
              {{ billingAddressGetter.first_name || '' }}
              {{ billingAddressGetter.last_name || '' }}
            </div>
            <div v-if="billingAddressGetter.address1">
              {{ billingAddressGetter.address1 }}
            </div>
            <div v-if="billingAddressGetter.address2">
              {{ billingAddressGetter.address2 }}
            </div>
            <div v-if="billingAddressGetter.company">
              {{ billingAddressGetter.company }}
            </div>
            <div v-if="hasCityProvinceOrZip">
              {{ cityProvinceAndZip }}
            </div>
            <div v-if="billingAddressGetter.country">
              {{ billingAddressGetter.country }}
            </div>
            <div v-if="billingAddressGetter.phone">
              {{ billingAddressGetter.phone }}
            </div>
          </base-card-item>
        </base-card-wrapper>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import { rechargeURL, previewThemeQuery } from '@/config'

export default {
  name: 'Details',

  props: {
    customer: {
      type: Object,
      required: true
    },

    deliverySchedule: {
      type: Array,
      required: false
    }
  },

  data: () => ({
    paypalEditInfoVisible: false,
    rechargeURL,
    previewThemeQuery
  }),

  computed: {
    ...mapState([
      'customerHash',

      'drawerOpen',
      'drawerContentType',

      'initialRechargeDataLoading',

      'newProductAddedSaved',
      'frequencySaved',
      'updatingRemovingProduct',

      'activeFirstDeliverySubscription',
      'activeDeliveryAddressId',
      'activeDeliveryFrequency',
      'activeDeliveryIntervalUnit',
      'activeDeliveryAddress'
    ]),

    ...mapGetters([
      'activeSubscriptions',
      'activeDeliveryChargeScheduledAt',
      'billingAddressGetter'
    ]),

    updateCardUrl() {
      return `/tools/recurring/customer/${this.customerHash}/card/`
    },

    creditCardImage() {
      let creditCardBrand = ''
      let creditCardImage = ''

      if (this.customer.customer_card && this.customer.customer_card.brand) {
        creditCardBrand = this.customer.customer_card.brand
      }

      console.log(creditCardBrand)

      switch (creditCardBrand) {
        case 'Visa':
          creditCardImage =
            'https://cdn.shopify.com/s/files/1/0739/9341/files/visa-icon.png?9900082236234763207'
          break
        case 'American Express':
          creditCardImage =
            'https://cdn.shopify.com/s/files/1/0739/9341/files/amex-icon.png?9900082236234763207'
          break
        case 'Mastercard':
          creditCardImage =
            'https://cdn.shopify.com/s/files/1/0739/9341/files/mastercard-icon.png?9900082236234763207'
          break
        default:
          creditCardImage = false
      }

      return creditCardImage
    },

    cardURL() {
      Object.keys(this.customer).forEach(k =>
        console.log(k, ':', this.customer[k])
      )
      if (this.customer.customer_payment_type === 'credit') {
        return this.updateCardUrl
      } else if (this.customer.customer_payment_type === 'paypal') {
        return this.showPaypalEditInfo
      }

      return ''
    },

    hasCityProvinceOrZip() {
      const { city, province, zip } = this.billingAddressGetter
      return city || province || zip
    },

    cityProvinceAndZip() {
      const { city, province, zip } = this.billingAddressGetter
      return `${city || ''} ${province || ''} ${zip || ''}`
    },

    shippingAddress() {
      return this.activeDeliveryAddress
    }
  },

  methods: {
    prettyDate(date) {
      return moment(date).format('MMM Do')
    },

    ...mapMutations([
      'setDrawerContentType',
      'openDrawer',

      'setActiveFirstDeliverySubscription',
      'setActiveDeliveryAddressId',
      'setActiveDeliveryFrequency',
      'setActiveDeliveryIntervalUnit'
    ]),

    showPaypalEditInfo() {
      this.paypalEditInfoVisible = true
    },

    openDrawerEditBillingAddress() {
      this.setDrawerContentType('editBillingAddress')
      this.openDrawer()
    },

    setAndOpenDrawer(contentType) {
      this.setDrawerContentType(contentType)
      this.openDrawer()
    }
  }
}
</script>

<style lang="scss">
.c-details {
  padding: 54px 20px 0;
  margin: 0 auto;
  max-width: 1060px;

  @media (max-width: 1023px) {
    padding: 54px 28px 0;
  }
}

.c-details__paypalInfo {
  a {
    color: #ee2e2d;
    font-weight: 700;
  }
}

.c-details__left {
  margin-right: 68px;
  float: left;
  max-width: 350px;
  width: 100%;

  @media (max-width: 1023px) {
    float: none;
    margin: 0 auto;
  }
}

.c-details__right {
  float: left;
  width: 100%;
  max-width: 350px;
}

.c-details__card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;

  img {
    width: 30px;
    margin-right: 10px;
  }

  span {
    display: inline-block;
    margin-bottom: 0;
    line-height: 1;

    &:first-of-type {
      margin-right: 5px;
    }
  }
}
</style>
