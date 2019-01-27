<template>
  <div class="vuePortal">
    <div class="vuePortalInner">
      <HeaderNavigation class="vue-portal-header" />
      <router-view
        class="vuePortal__route"
        :base-url="baseUrl"
        :customer-hash="customerHash"
        :customer="customer"
        :addresses="addresses"
        :orders="orders"
        :products="products"
        :subscriptions="subscriptions"
        :deliverySchedule="deliverySchedule"
      />
      <div
        class="c-rOverlay"
        v-if="(drawerOpen || modalOpen) && !updateOverlay"
        @click="closeAndResetDrawer"
      ></div>
      <UpdateOverlay
        class="c-rUpdateOverlay"
        v-if="updateOverlay"
      />
    </div>
    <Drawer
      :products="products"
      :subscriptions="subscriptions"
    />
    <Modal v-if="modalOpen" />
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations, mapActions } from 'vuex'
import UpdateOverlay from '@/components/UpdateOverlay'
import Drawer from '@/components/Drawer'
import Modal from '@/components/Modal'
import HeaderNavigation from '@/components/HeaderNavigation'

export default {
  components: {
    UpdateOverlay,
    HeaderNavigation,
    Drawer,
    Modal
  },

  watch: {
    $route(to, from) {
      $('.js-expand-trigger').removeClass('is-open')
      $('.js-expand-content').addClass('is-closed')
    }
  },

  mounted() {
    const vm = this

    // reset
    this.closeDrawer()
    this.closeModal()
    this.setCombineSubscriptionsUpdating(false)
    this.setCombineSubscriptionsSaved(false)
    this.setShipsOnUpdating(false)
    this.setShipsOnSaved(false)
    this.setProductEditDrawerUpdating(false)
    this.setProductEditDrawerSaved(false)
    this.setSkipShipmentUpdating(false)
    this.setSkipShipmentSaved(false)
    this.setAddressUpdating(false)
    this.setAddressSaved(false)
    this.setNewProductAddedSaved(false)

    this.setCustomerHash(VuePortal.customerHash)
    this.$nextTick(() => {
      vm.loadInitialData()
    })
  },

  computed: {
    ...mapState([
      'updateOverlay',
      'baseUrl',
      'customerHash',
      'drawerOpen',
      'modalOpen',
      'customer',
      'addresses',
      'subscriptions',
      'orders',
      'products',
      'deliverySchedule'
    ])
  },

  methods: {
    ...mapMutations([
      'setCustomerHash',

      'setDrawerContentType',
      'closeDrawer',
      'closeModal',

      'setCombineSubscriptionsUpdating',
      'setCombineSubscriptionsSaved',
      'setShipsOnUpdating',
      'setShipsOnSaved',
      'setProductEditDrawerUpdating',
      'setProductEditDrawerSaved',
      'setSkipShipmentUpdating',
      'setSkipShipmentSaved',
      'setAddressUpdating',
      'setAddressSaved',
      'setNewProductAddedSaved'
    ]),

    ...mapActions(['loadInitialData']),

    closeAndResetDrawer() {
      this.closeDrawer()
      this.closeModal()

      setTimeout(() => {
        this.setDrawerContentType(false)
      }, 300)
    }
  }
}

$(document).ready(function() {
  console.log('document ready')
  $(document).on('click', '.js-expand-trigger', function() {
    var wrapper = $(this).closest('.js-expand-wrapper')
    var content = wrapper.find('.js-expand-content')
    $(this).toggleClass('is-open')

    content.toggleClass('is-closed')
    console.log('run trigger')
  })
})
</script>

<style lang="scss">
.js-expand-content {
  @media (max-width: 1023px) {
    &.is-closed {
      display: none !important;
    }
  }
}

// Hides block content of template
// force display block within indv templates where needed
.vue-block-content {
  display: none;
}

.vue-part-of-template-header {
  display: none;
}

.c-rOverlay {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #000;
  opacity: 0.4;
}

.c-rUpdateOverlay {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.c-rUpdateOverlay__box {
  text-align: center;
}

.c-rUpdateOverlay__text {
  color: #fff;
  font-family: Avenir;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 28px;
  text-align: center;
  letter-spacing: 4px;
  margin-top: 10px;
}

.c-rButton {
  cursor: pointer;
  display: inline-block;
  background-color: #000;
  color: #fff;
  text-transform: uppercase;
  font-size: 13px;
  line-height: 1;
  letter-spacing: 2px;
  padding: 10px 30px;
  text-align: center;
  font-family: Avenir;
  font-weight: 700;
  border: 1px solid #000;
  transition: all 0.3s ease;

  span {
    color: #fff;
  }

  &:hover,
  &:active,
  &:focus {
    background-color: #fff;
    color: #000;

    svg .svg-color {
      fill: #000;
    }

    span {
      color: #000;
    }
  }

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.c-rButton--red {
    background-color: #ee2e2d;
    border-color: #ee2e2d;
    color: #fff;

    span {
      color: #fff;
    }

    &:hover,
    &:active,
    &:focus {
      opacity: 0.7;
      background-color: #ee2e2d;
      color: #fff;

      span {
        color: #fff;
      }
    }
  }
}

.c-sub__initialContainer {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: 400px;
  padding-top: 40px;
  padding-bottom: 40px;
  margin-bottom: 60px;

  @media (max-width: 1023px) {
    margin-bottom: 50px;
    padding: 65px 30px;
  }

  .c-rButton {
    padding: 16px 42px;
  }
}

.c-sub__initialMessage {
  font-size: 23px;
  line-height: 35px;
  font-weight: 700;
  font-family: Avenir;
  letter-spacing: 3px;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 60px;
}

.c-rOption {
  border-radius: 10px;
  border: 3px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 12px;
  margin-bottom: 20px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    border-color: #7fc464;
  }

  &.is-active {
    border-color: #7fc464;

    .c-rOptionCheck {
      display: block;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    svg {
      width: 13px;
      fill: white;
      margin-left: -1px;
      margin-bottom: -1px;
    }
  }
}

.c-rOptionText {
  font-family: Avenir;
  font-weight: 400;
  text-align: center;

  &--1 {
    text-transform: uppercase;
    font-size: 19px;
    line-height: 29px;
    letter-spacing: 2px;
  }

  &--2 {
    text-transform: none;
    font-size: 16px;
    line-height: 25px;
    letter-spacing: 0px;
  }
}

.c-rOptionCheck {
  display: none;
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  left: 50%;
  top: -2px;
  background-color: #7fc464;
  border-radius: 100px;
  color: #fff;
  width: 24px;
  height: 24px;
}

input.c-rForm__input::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #bfbfbf;
}
input.c-rForm__input::-moz-placeholder {
  /* Firefox 19+ */
  color: #bfbfbf;
}
input.c-rForm__input:-ms-input-placeholder {
  /* IE 10+ */
  color: #bfbfbf;
}
input.c-rForm__input:-moz-placeholder {
  /* Firefox 18- */
  color: #bfbfbf;
}

.c-rForm {
  margin-bottom: 28px;
}

.c-rForm__inputWrapper {
  margin-bottom: 10px;

  &.c-rForm__inputWrapper--half {
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 5px));
    grid-column-gap: 10px;
  }
}

input.c-rForm__input,
select.c-rForm__input {
  width: 100%;
  font-family: Avenir;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0;
  color: #7f7f7f;
  border: 1px solid #d7d7d7;
  background-color: #fff;
  padding: 6px;
}

.c-rForm__errorMessage {
  display: block;
  text-align: center;
  text-transform: none;
  font-weight: 500;
  line-height: 16px;
  color: #ee2e2d;
}

/* Fade */
.fade-enter-active,
.fade-leave-active {
  transition: 500ms;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
