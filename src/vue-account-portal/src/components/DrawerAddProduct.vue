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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import DrawerProduct from '../components/DrawerProduct.vue'

export default {
  name: 'DrawerAddProduct',

  components: {
    DrawerProduct
  },

  props: {
    products: {
      type: Array,
      required: true
    },

    subscriptions: {
      type: Array,
      required: true
    }
  },

  data: function() {
    return {}
  },

  mounted() {},

  computed: {
    // ...mapState([
    //     'drawerOpen',
    //     'drawerContentType',
    // ]),

    ...mapGetters(['activeSubscriptions', 'availableProducts'])
  },

  methods: {
    // ...mapMutations([
    //     'setDrawerContentType',
    //     'closeDrawer',
    //     'openDrawer',
    //     'toggleDrawer'
    // ]),
    // closeDrawerAndResetType() {
    //     this.closeDrawer()
    //     setTimeout(() => {
    //         this.resetType(false)
    //     }, 301)
    // }
  }
}
</script>

<style lang="scss">
.c-rDrawerAddProduct {
  margin-left: -30px;
  margin-right: -30px;
}
</style>
