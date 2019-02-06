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
      <transition name="fade">
        <div
          class="c-rOverlay"
          v-if="(drawerOpen || modalOpen) && !updateOverlay"
          @click="closeAndResetDrawer"
        />
      </transition>
      <UpdateOverlay
        class="c-rUpdateOverlay"
        v-if="updateOverlay"
      />
    </div>
    <Drawer
      :products="products"
      :subscriptions="subscriptions"
    />
    <modal v-if="modalOpen" />
    <transition name="fade">
      <modal-add-product v-if="showAddProductModal" />
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations, mapActions } from 'vuex'
import UpdateOverlay from '@/components/UpdateOverlay'
import Drawer from '@/components/Drawer'
import Modal from '@/components/Modal'
import ModalAddProduct from '@/components/ModalAddProduct'
import HeaderNavigation from '@/components/HeaderNavigation'

export default {
  components: {
    UpdateOverlay,
    HeaderNavigation,
    Drawer,
    Modal,
    ModalAddProduct
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
    ]),

    ...mapState('ui', ['showAddProductModal'])
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
  $(document).on('click', '.js-expand-trigger', function() {
    var wrapper = $(this).closest('.js-expand-wrapper')
    var content = wrapper.find('.js-expand-content')
    $(this).toggleClass('is-open')

    content.toggleClass('is-closed')
  })
})
</script>
