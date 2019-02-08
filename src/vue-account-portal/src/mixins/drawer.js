import { mapState, mapMutations } from 'vuex'

export default {
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
