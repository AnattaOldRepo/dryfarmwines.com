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
              @click.prevent="addVariant"
              long-button
            >
              {{ updating ? '...' : 'Add' }}
            </base-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ModalAddProductSelect from './ModalAddProductSelect'

export default {
  components: {
    ModalAddProductSelect
  },

  props: {
    product: {
      type: Object,
      required: true
    },

    hideModal: {
      type: Function,
      required: true
    }
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

    ...mapGetters(['uniqueDeliveries']),

    addressOptions() {
      return {
        values: this.addresses.map(address => address.id),
        displayValues: this.addresses.map(address => address.address1)
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
    ...mapActions(['addProductAction']),

    addVariant() {
      this.updating = true
      this.addProductAction({
        address_id: this.addressID,
        order_interval_frequency: this.deliveryFrequency,
        order_interval_unit: this.intervalUnit,
        shopify_variant_id: this.currentVariant.id
      })
    },

    potentiallyHide({ target }) {
      if (this.$refs.modal && !this.$refs.modal.contains(target)) {
        this.hideModal()
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

      // Address options select element
      const { value: addressID } = this.$refs.addressSelect.$el.firstElementChild
      this.addressID = Number(addressID)

      const {
        value: deliveryFrequency
      } = this.$refs.deliveryFrequencySelect.$el.firstElementChild
      this.deliveryFrequency = Number(deliveryFrequency)
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
@import '../assets/css/variables';

img {
  width: 100%;
  transition: all 0.3s;
}

.c-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
}

.c-modal {
  margin: 1.618em;
  padding: 3em;
  height: 100%;
  width: 100%;
  max-height: 500px;
  max-width: 800px;
  border-radius: 5px;
  background: $off-white;
  box-shadow: 0 8px 80px -22px rgba(0, 0, 0, 0.33);
}

.c-modalForm {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
}

.c-modalForm__imageWrapper {
  transition: all 0.33s;
}

.c-modalForm__title {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 1em;
}

.c-modalForm__add {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2em;
}

.c-modalForm__price {
  font-size: 24px;
  font-weight: 400;
}

.c-modalForm__button {
  width: 50%;
}
</style>
