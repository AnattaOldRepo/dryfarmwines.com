export default {
  state: {
    drawerContent: false,
    modalContent: false,
    mobileNavOpen: false,
    appLoading: true,
    appUpdating: false
  },
  getters: {
    drawerContent: state => {
      return state.drawerContent
    },
    modalContent: state => {
      return state.modalContent
    },
    mobileNavOpen: state => {
      return state.mobileNavOpen
    },
    appLoading: state => {
      return state.appLoading
    },
    appUpdating: state => {
      return state.appUpdating
    }
  },
  mutations: {
    clearAppLoading(state) {
      state.appLoading = false
    },
    toggleAppUpdating(state) {
      state.appUpdating = !state.appUpdating
    },
    setAppUpdating(state) {
      state.appUpdating = true
    },
    clearAppUpdating(state) {
      state.appUpdating = false
    },
    setDrawer(state, value) {
      state.drawerContent = value
    },
    closeDrawer(state) {
      state.drawerContent = false
    },
    setModal(state, value) {
      state.modalContent = value
    },
    closeModal(state) {
      state.modalContent = false
    },
    toggleMobileNav(state) {
      state.mobileNavOpen = !state.mobileNavOpen
    },
    closeMobileNav(state) {
      state.mobileNavOpen = false
    }
  },
  actions: {
    resetUi({ commit }) {
      commit('closeDrawer')
      commit('closeModal')
      commit('closeMobileNav')
    }
  }
}
