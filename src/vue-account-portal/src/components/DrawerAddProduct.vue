<template>
  <div class="c-rDrawerAddProduct">
    <span class="c-rDrawer__title">Add Products</span>
    <drawer-product
      v-for="product in availableProducts"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DrawerProduct from '@/components/DrawerProduct.vue'

export default {
  components: {
    DrawerProduct
  },

  computed: {
    ...mapGetters(['availableProducts'])
  }
}
</script>

<style lang="scss" scoped>
.c-rDrawerAddProduct {
  margin-left: -30px;
  margin-right: -30px;
}
</style>
