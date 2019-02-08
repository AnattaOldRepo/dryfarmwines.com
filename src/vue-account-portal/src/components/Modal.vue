<template>
  <div
    class="c-rModal"
    :class="{ 'is-open': modalOpen, 'c-rModal--large': true }"
  >
    <div class="c-rModal__head">
      <span
        class="c-rModal__title "
        v-if="subscriptionCanceled"
      >
        Cancellation
      </span>

      <span
        class="c-rModal__title "
        v-else
      >
        WAIT!
      </span>
    </div>

    <div
      class="c-rModal__inner"
      v-if="subscriptionCanceled"
    >
      <div class="c-rModal__content">
        <p class="c-rModal__text c-rModal__text--bold">
          Your subscription is now cancelled.
        </p>

        <p class="c-rModal__text c-rModal__text--bold c-rModal__text--red">
          You will no longer be receiving shipments of<br />
          {{ canceledSubscriptionTitles }}.
        </p>

        <p class="c-rModal__text c-rModal__text--med">
          You're all set to place an order whenever you're ready. Change your
          mind about your membership? You're welcome to begin a new membership
          at any time.
        </p>
      </div>

      <div
        class="c-rModal__actionBox"
        style="margin-top: 20px;"
      >
        <a
          class="c-rButton c-rButton--red"
          :href="`${this.siteURL}/collections/all-products/`"
        >
          WHAT'S NEW
        </a>

        <a
          class="c-rButton"
          :href="`${this.siteURL}/account/`"
        >
          BACK TO ACCOUNT
        </a>
      </div>
    </div>

    <div
      class="c-rModal__inner"
      v-else-if="!subscriptionCancelAvailable"
    >
      <div class="c-rModal__content">
        <p class="c-rModal__text c-rModal__text--bold c-rModal__text--red">
          TO CANCEL BEFORE YOU’VE RECEIVED 3 SHIPMENTS,<br />PLEASE EMAIL
          <a href="https://dryfarmwines.zendesk.com/hc/en-us/categories/201489385-Contact-Us">CUSTOMER SUPPORT*</a>.
        </p>

        <p class="c-rModal__text c-rModal__text--extra">
          <a href="mailto:support@dryfarmwines.com">support@dryfarmwines.com</a>
        </p>

        <p class="c-rModal__text c-rModal__text--bold c-rModal__text--red">
          members receive 20% off + free shipping on all auto renew orders. IF
          YOU CANCEL BEFORE YOU’VE RECEIVED 3 SHIPMENTS,
          <br />YOU’LL BE CHARGED THE FULL PRODUCT AMOUNT + SHIPPING ON EACH
          APPLICABLE ORDER.
        </p>
      </div>

      <div class="c-rModal__actionBox c-rModal__actionBox--triple">
        <a
          class="c-rButton c-rButton--red"
          @click.prevent="openDrawerEditShipDate"
        >
          <span>Change Shipping Date</span>
        </a>

        <a
          class="c-rButton c-rButton--red"
          @click.prevent="openDrawerRetentionEditProducts"
        >
          <span>Swap My Products</span>
        </a>

        <a
          class="c-rButton c-rButton--red"
          @click.prevent="closeModal"
        >
          Don't Cancel
        </a>
      </div>
    </div>

    <div
      class="c-rModal__inner"
      v-else-if="subscriptionCancelAvailable"
    >
      <div class="c-rModal__content">
        <p
          class="c-rModal__text c-rModal__text--bold c-rModal__text--red"
          style="max-width: 500px; margin-left: auto; margin-right: auto;"
        >
          Don't lose your 20% Member discount and free shipping on all Member
          orders!
        </p>

        <div class="c-rModal__actionBox c-rModal__actionBox--triple">
          <a
            class="c-rButton c-rButton--red"
            @click.prevent="openDrawerEditShipDate"
          >
            <span>Change Shipping Date</span>
          </a>

          <a
            class="c-rButton c-rButton--red"
            @click.prevent="openDrawerRetentionEditProducts"
          >
            <span>Swap My Products</span>
          </a>

          <a
            class="c-rButton c-rButton--red"
            @click.prevent="closeModal"
          >
            Don't Cancel
          </a>
        </div>

        <p class="c-rModal__text c-rModal__text--med">
          Not into a subscription? No problem.
        </p>
      </div>

      <div
        class="c-rModal__confirm"
        @click="confirmTerms()"
      >
        <span
          class="c-rModal__confirmCheckbox"
          :class="{ 'is-checked': termsConfirmed }"
        ></span>
        <span class="c-rModal__text c-rModal__text--bold">CONTINUE</span>
      </div>

      <div class="c-rModal__actionBox c-rModal__actionBox--single">
        <a
          class="c-rButton c-rButton--red"
          @click.prevent="goToRetention"
          :disabled="termsConfirmed === false"
          :class="{ 'is-disabled': termsConfirmed === false }"
        >
          Cancel Subscription
        </a>
      </div>
    </div>

    <span
      class="c-rModal__close"
      @click="closeModalAndResetType"
    >
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="95.939px"
        height="95.939px"
        viewBox="0 0 95.939 95.939"
        xml:space="preserve"
      >
        <g>
          <path d="M62.819,47.97l32.533-32.534c0.781-0.781,0.781-2.047,0-2.828L83.333,0.586C82.958,0.211,82.448,0,81.919,0
                            c-0.53,0-1.039,0.211-1.414,0.586L47.97,33.121L15.435,0.586c-0.75-0.75-2.078-0.75-2.828,0L0.587,12.608
                            c-0.781,0.781-0.781,2.047,0,2.828L33.121,47.97L0.587,80.504c-0.781,0.781-0.781,2.047,0,2.828l12.02,12.021
                            c0.375,0.375,0.884,0.586,1.414,0.586c0.53,0,1.039-0.211,1.414-0.586L47.97,62.818l32.535,32.535
                            c0.375,0.375,0.884,0.586,1.414,0.586c0.529,0,1.039-0.211,1.414-0.586l12.02-12.021c0.781-0.781,0.781-2.048,0-2.828L62.819,47.97
                            z"></path>
        </g>
      </svg>
    </span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { siteURL } from '@/config'

export default {
  name: 'Modal',

  data: () => ({
    termsConfirmed: false,
    siteURL
  }),

  mounted() {},

  computed: {
    ...mapState([
      'modalOpen',
      'orders',
      'subscriptionCanceled',
      'canceledSubscriptionTitles',
      'canceledFrequencyText'
    ]),

    // calculate if eligible to cancel on their own
    subscriptionCancelAvailable() {
      console.log('test')
      return this.orders.length >= 3
      // return true
    }
  },

  methods: {
    ...mapMutations([
      'closeModal',
      'toggleModal',
      'setDrawerContentType',
      'openDrawer'
    ]),

    confirmTerms() {
      this.termsConfirmed = true
    },

    closeModalAndResetType() {
      this.closeModal()

      setTimeout(() => {}, 301)
    },

    goToRetention() {
      this.closeModalAndResetType()
      this.$router.push({ name: 'RetentionPage' })
    },

    openDrawerEditShipDate() {
      this.closeModal()
      this.setDrawerContentType('editShipDate')
      this.openDrawer()
    },

    openDrawerRetentionEditProducts() {
      this.closeModal()
      this.setDrawerContentType('retentionEditProducts')
      this.openDrawer()
    }
  }
}
</script>

<style lang="scss">
@import '~styles/components/modal';
</style>
