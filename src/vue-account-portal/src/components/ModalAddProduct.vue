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
            v-for="option in product.options"
            :key="option.name"
            :label="option.name"
            :values="option.values"
            ref="selects"
            @change="handleSelect"
          />
          <div class="c-modalForm__add">
            <div
              v-if="currentVariant"
              class="c-modalForm__price"
            >
              {{ currentVariant.price }}
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
import { mapActions } from 'vuex'
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
    currentVariant: null,
    updating: false
  }),

  mounted() {
    this.getSelected()
  },

  computed: {
    currentVariantImage() {
      return this.currentVariant
        ? this.product.images.find(
            image => this.currentVariant.image_id === image.id
          )
        : false
    },

    defaultImage() {
      console.log(this.product.image)
      return this.product.image
    }
  },

  methods: {
    ...mapActions(['addProductAction']),

    addVariant() {
      this.updating = true
      console.log('variant id', this.currentVariant.id)
      setTimeout(() => {
        this.updating = false
      }, 1000);
      // this.addProductAction(this.currentVariant.id)
    },

    potentiallyHide({ target }) {
      if (!this.$refs.modal.contains(target)) {
        this.hideModal()
      }
    },

    handleSelect({ target: { name, value } }) {
      this.selected[name] = value
      this.getCurrentVariant(this.selected)
    },

    getSelected() {
      this.$refs.selects.forEach(({ $el }) => {
        const { name, value } = $el.firstElementChild
        this.selected[name] = value
      })
      this.getCurrentVariant(this.selected)
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
