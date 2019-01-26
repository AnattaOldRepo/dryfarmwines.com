<template>
  <div
    class="c-rModal"
    :class="{ 'is-open': modalOpen, 'c-rModal--large': true }"
  >
    <div class="c-rModal__head">
      <span class="c-rModal__title " v-if="subscriptionCanceled"
        >Cancellation</span
      >

      <span class="c-rModal__title " v-else>WAIT!</span>
    </div>

    <div class="c-rModal__inner" v-if="subscriptionCanceled">
      <div class="c-rModal__content">
        <p class="c-rModal__text c-rModal__text--bold">
          your subscription is now cancelled.
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

      <div class="c-rModal__actionBox" style="margin-top: 20px;">
        <a
          class="c-rButton c-rButton--red"
          href="https://www.dryfarmwines.com/collections/all-products/"
        >
          WHAT'S NEW
        </a>

        <a class="c-rButton" href="https://www.dryfarmwines.com/account/">
          BACK TO ACCOUNT
        </a>
      </div>
    </div>

    <div class="c-rModal__inner" v-else-if="!subscriptionCancelAvailable">
      <div class="c-rModal__content">
        <p class="c-rModal__text c-rModal__text--bold c-rModal__text--red">
          TO CANCEL BEFORE YOU’VE RECEIVED 3 SHIPMENTS,<br />
          PLEASE EMAIL
          <a
            href="https://dryfarmwines.zendesk.com/hc/en-us/categories/201489385-Contact-Us"
            >CUSTOMER SUPPORT*</a
          >.
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

        <!-- <p class="c-rModal__text c-rModal__text--med">
                    Not into a subscription?  No problem.  You can make as many one time purchases as you like.
                </p> -->
      </div>

      <!-- <div class="c-rModal__actionBox c-rModal__actionBox--single">
                <a class="c-rButton c-rButton--red"
                    @click.prevent="closeModal"
                >
                    Don't Cancel
                </a>            
            </div>    -->

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

        <a class="c-rButton c-rButton--red" @click.prevent="closeModal">
          Don't Cancel
        </a>
      </div>
    </div>

    <div class="c-rModal__inner" v-else-if="subscriptionCancelAvailable">
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

          <a class="c-rButton c-rButton--red" @click.prevent="closeModal">
            Don't Cancel
          </a>
        </div>

        <p class="c-rModal__text c-rModal__text--med">
          Not into a subscription? No problem.
        </p>
      </div>

      <div class="c-rModal__confirm" @click="confirmTerms()">
        <span
          class="c-rModal__confirmCheckbox"
          :class="{ 'is-checked': termsConfirmed }"
        ></span>
        <span class="c-rModal__text c-rModal__text--bold">CONTINUE</span>
      </div>

      <div class="c-rModal__actionBox c-rModal__actionBox--single">
        <!-- <a class="c-rButton c-rButton--red"
                    @click.prevent="closeModal"
                >
                    Don't Cancel
                </a> -->

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

    <span class="c-rModal__close" @click="closeModalAndResetType">
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
          <path
            d="M62.819,47.97l32.533-32.534c0.781-0.781,0.781-2.047,0-2.828L83.333,0.586C82.958,0.211,82.448,0,81.919,0
                            c-0.53,0-1.039,0.211-1.414,0.586L47.97,33.121L15.435,0.586c-0.75-0.75-2.078-0.75-2.828,0L0.587,12.608
                            c-0.781,0.781-0.781,2.047,0,2.828L33.121,47.97L0.587,80.504c-0.781,0.781-0.781,2.047,0,2.828l12.02,12.021
                            c0.375,0.375,0.884,0.586,1.414,0.586c0.53,0,1.039-0.211,1.414-0.586L47.97,62.818l32.535,32.535
                            c0.375,0.375,0.884,0.586,1.414,0.586c0.529,0,1.039-0.211,1.414-0.586l12.02-12.021c0.781-0.781,0.781-2.048,0-2.828L62.819,47.97
                            z"
          ></path>
        </g>
      </svg>
    </span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

// import ModalShippingAddresses from '../components/ModalShippingAddresses.vue'

export default {
  name: 'Modal',

  components: {
    // ModalShippingAddresses
  },

  props: {},

  data: function() {
    return {
      termsConfirmed: false
    }
  },

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
      'openModal',
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
.c-rModal {
  position: fixed;
  z-index: 1002;
  max-width: 554px;
  width: 100%;
  height: auto;
  transform: translateX(-50%) translateY(-50%);
  transition: transform 0.3s ease;
  top: 50%;
  left: 50%;
  background-color: #f7f7f7;
  text-align: center;

  &--large {
    max-width: 740px;
  }
}

.c-rModal__head {
  padding: 22px;
  border-bottom: 1px solid #dcdcdc;
}

.c-rModal__title {
  display: block;
  text-align: center;
  font-family: Gotham Book;
  font-weight: 400;
  font-size: 19px;
  line-height: 29px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.c-rModal__close {
  position: absolute;
  right: 30px;
  top: 30px;

  svg {
    width: 13px;
    height: 13px;
  }
}

.c-rModal__actionBox {
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 5px));
  grid-column-gap: 10px;

  @media (max-width: 1023px) {
    display: grid;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    max-width: 240px;
    margin: 0 auto;
    grid-template-columns: 1fr;
  }

  &--single {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;

    .c-rButton {
      padding: 12px 54px !important;
      &:hover,
      &:focus,
      &:active {
        padding-left: 54px;
      }
    }
  }

  &--triple {
    @media (min-width: 1024px) {
      display: grid;
      grid-template-columns: repeat(3, calc(33% - 5px));
      grid-column-gap: 10px;
      margin: 30px 0;
    }
  }

  .c-rButton {
    margin-bottom: 10px;
    padding: 12px 0;

    &:disabled,
    &.is-disabled {
      background-color: #f0f0f0;
      border-color: #f0f0f0;
      cursor: default;

      &:hover,
      &:focus,
      &:active {
        color: #fff !important;
        background-color: #f0f0f0;
        border-color: #f0f0f0;
        padding-left: 0 !important;
      }
    }
  }
}

.c-rModal__inner {
  padding: 28px;

  // @media (max-width: 1023px) {
  //     padding: 28px 50px;
  // }
}

.c-rModal__content {
}

.c-subLandPopup__confirm {
  font-family: Gotham;
  font-weight: 700;
  font-size: 16px;
  margin-top: 23px;
  letter-spacing: 0;
  display: flex;
  margin: 0 auto;
  width: 100px;
  justify-content: center;
  lost-utility: clearfix;
  margin-top: 22px;
}

.c-rModal__confirm {
  margin: 28px 0px;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 1023px) {
    margin: 20px 0 30px;
  }

  &:before,
  &:after {
    content: '';
    display: table;
  }

  span {
    line-height: 1;
    margin-bottom: 0;
  }
}
.c-rModal__confirmCheckbox {
  width: 20px;
  height: 20px;
  border-radius: 2px;
  border: 2px solid black;
  margin-right: 10px;

  display: block;
  width: 23px;
  height: 23px;
  border: 1px solid;
  background-color: white;
  margin-right: 8px;
  position: relative;
  cursor: pointer;

  &:after {
    display: none;
    position: absolute;
    content: '';
    height: 6px;
    width: 13px;
    left: 4px;
    z-index: 1;
    top: 7px;
    color: white;
    border-left: 2px solid;
    border-bottom: 2px solid;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  &.is-checked {
    background-color: #000;

    &:after {
      display: block;
    }
  }
}

.c-rModal__text {
  font-family: Gotham Book;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0;
  margin-bottom: 10px;

  @media (max-width: 1023px) {
    br {
      display: none;
    }
  }

  &--bold {
    font-family: Gotham;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;

    @media (max-width: 1023px) {
      margin-bottom: 18px;
    }
  }

  &--med {
    @media (max-width: 1023px) {
      line-height: 25px;
      font-size: 16px;
    }
  }

  &--red {
    color: #ee2e2d;
  }

  &--extra {
    font-family: Gotham;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 11px;
    line-height: 35px;
    letter-spacing: 2px;
    margin-bottom: 8px;

    @media (min-width: 360px) {
      font-size: 15px;
      letter-spacing: 3px;
    }

    @media (--tablet) {
      font-size: 17px;
      letter-spacing: 3px;
    }
  }
}
</style>
