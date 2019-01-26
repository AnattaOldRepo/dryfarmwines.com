<template>
  <div class="c-rDrawerAddAddress"></div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'DrawerAddAddress',

  props: {
    // product: {
    //     type: Object,
    //     required: true
    // }
  },

  data: function() {
    return {}
  },

  mounted() {},

  computed: {
    ...mapState(['drawerOpen', 'drawerContentType'])
  },

  methods: {
    ...mapMutations([
      'setDrawerContentType',
      'closeDrawer',
      'openDrawer',
      'toggleDrawer'
    ]),

    closeDrawerAndResetType() {
      this.closeDrawer()
      setTimeout(() => {
        this.resetType(false)
      }, 301)
    }
  }
}
</script>

<style lang="scss">
.c-rDrawerAddAddress {
}
</style>
