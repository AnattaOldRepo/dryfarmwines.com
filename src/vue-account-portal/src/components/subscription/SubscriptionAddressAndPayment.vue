<template>
  <base-card-wrapper>
    <base-card-item
      heading="Shipping Address"
      @click="setDrawer('DrawerShipping')"
      aria-label="Change shipping address"
    >
      <div
        v-for="(line, index) in cleanShipping"
        :key="index"
      >
        {{ line }}
      </div>
    </base-card-item>
    <details-payment />
  </base-card-wrapper>
</template>

<script>
import DetailsPayment from '@/components/details/DetailsPayment'
import { mapGetters, mapMutations } from 'vuex'
import { cleanAddress, isEmptyObject } from '@/assets/js'
import { chevronBlue } from '@/assets/svg'
export default {
  components: {
    DetailsPayment
  },

  data() {
    return {
      chevronBlue
    }
  },

  computed: {
    ...mapGetters('addresses', ['activeAddress']),
    cleanShipping() {
      const cleanShipping = cleanAddress(this.activeAddress)
      return Object.keys(cleanShipping).reduce((address, key) => {
        if (cleanShipping[key]) {
          address[key] = cleanShipping[key]
        }

        return address
      }, {})
    }
  },

  methods: {
    ...mapMutations('ui', ['setDrawer'])
  }
}
</script>
