<template>
  <div
    class="c-overlay"
    @click="potentiallyHide"
  >
    <div
      class="c-modal"
      ref="modal"
    >
      <form class="c-modalForm">
        <!-- <transition name="fade-image"> -->
        <div
          class="c-modalForm__imageWrapper"
          :key="currentVariantImage ? currentVariantImage.id : defaultImage.id"
        >
          <img
            :src="currentVariantImage ? currentVariantImage.src : defaultImage.src"
            :alt="currentVariantImage ? currentVariantImage.alt || '' : defaultImage.alt || ''"
          >
        </div>
        <!-- </transition> -->
        <div>
          <div class="c-modalForm__title">{{ product.title }}</div>
          <modal-add-product-select
            v-if="mode === 'add'"
            label="Choose your delivery frequency"
            :values="deliveryFrequencies.values"
            :displayValues="deliveryFrequencies.displayValues"
            @change="handleSelectDeliveryFrequency"
            ref="deliveryFrequencySelect"
          />
          <modal-add-product-select
            v-for="option in product.options"
            :key="option.name"
            :label="option.name"
            :values="option.values"
            ref="selects"
            @change="handleSelectProductOption"
          />
          <modal-add-product-select
            v-if="mode === 'add'"
            label="Address"
            :values="addressOptions.values"
            :displayValues="addressOptions.displayValues"
            @change="handleSelectAddressID"
            ref="addressSelect"
          />
          <div class="c-modalForm__add">
            <div
              v-if="currentVariant"
              class="c-modalForm__price"
            >
              ${{ currentVariant.price }}
            </div>
            <base-button
              class="c-modalForm__button"
              @click.prevent="addOrSwapProductAction"
              long-button
            >
              {{ mode === 'swap' ? 'Swap' : 'Add' }}
            </base-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import ModalAddProductSelect from './ModalAddProductSelect'

export default {
  components: {
    ModalAddProductSelect
  },

  data: () => ({
    selected: {},
    addressID: null,
    intervalUnit: 'month',
    currentVariant: null,
    updating: false
  }),

  mounted() {
    this.getSelected()
  },

  computed: {
    ...mapState(['addresses']),

    ...mapState('ui', ['addProductModalProduct', 'mode']),

    ...mapGetters(['uniqueDeliveries']),

    product() {
      return this.addProductModalProduct
    },

    addressOptions() {
      return {
        values: this.addresses.map(address => address.id),
        displayValues: this.addresses.map(
          address =>
            `${address.first_name} ${address.last_name} ${address.address1}`
        )
      }
    },

    currentVariantImage() {
      return this.currentVariant
        ? this.product.images.find(
            image => this.currentVariant.image_id === image.id
          )
        : false
    },

    defaultImage() {
      return this.product.image
    },

    firstDeliverySubscription() {
      return this.uniqueDeliveries[0].delivery[0].subscription
    },

    intervalUnit() {
      return this.firstDeliverySubscription.charge_interval_unit
    },

    intervalFrequencies() {
      return this.firstDeliverySubscription.interval_options[this.intervalUnit]
    },

    deliveryFrequencies() {
      return {
        values: this.intervalFrequencies,
        displayValues: this.intervalFrequencies.map(
          freq => `Every ${freq > 1 ? `${freq} months` : `month`}`
        )
      }
    }
  },

  methods: {
    ...mapActions(['addProductAction', 'swapProductAction']),

    ...mapMutations('ui', ['closeAddProductModal']),

    addOrSwapProductAction() {
      if (this.mode === 'add') {
        this.addVariant()
      } else if (this.mode === 'swap') {
        this.swapProduct()
      } else if (this.mode === 'add to current subscription') {
        this.addVariantToCurrentSubscription()
      }
    },

    addVariant() {
      this.updating = true
      this.addProductAction({
        address_id: this.addressID,
        order_interval_frequency: this.deliveryFrequency,
        order_interval_unit: this.intervalUnit,
        shopify_variant_id: this.currentVariant.id
      })
    },

    swapProduct() {
      this.updating = true
      this.swapProductAction({
        shopify_variant_id: this.currentVariant.id
      })
    },

    addVariantToCurrentSubscription() {
      this.updating = true
      this.addProductAction({
        shopify_variant_id: this.currentVariant.id
      })
    },

    potentiallyHide({ target }) {
      if (this.$refs.modal && !this.$refs.modal.contains(target)) {
        this.closeAddProductModal()
      }
    },

    handleSelectProductOption({ target: { name, value } }) {
      this.selected[name] = value
      this.getCurrentVariant(this.selected)
    },

    handleSelectAddressID({ target: { value } }) {
      this.addressID = Number(value)
    },

    handleSelectDeliveryFrequency({ target: { value } }) {
      this.deliveryFrequency = value
    },

    getSelected() {
      // Product options select elements
      this.$refs.selects.forEach(({ $el }) => {
        const { name, value } = $el.firstElementChild
        this.selected[name] = value
      })

      this.getCurrentVariant(this.selected)

      if (this.mode === 'add') {
        // Address options select element
        const {
          value: addressID
        } = this.$refs.addressSelect.$el.firstElementChild
        this.addressID = Number(addressID)

        const {
          value: deliveryFrequency
        } = this.$refs.deliveryFrequencySelect.$el.firstElementChild
        this.deliveryFrequency = Number(deliveryFrequency)
      }
    },

    getCurrentVariant(selected) {
      const theVariant = this.product.variants.find(variant => {
        return Object.keys(selected).every((key, i) => {
          return selected[key] === variant[`option${i + 1}`]
        })
      })
      this.currentVariant = theVariant
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/components/modal-add-product";
</style>
