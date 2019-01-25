<template lang="pug">
  .vp
    Header
    .vp__content
      router-view.vp__container(v-if="!appLoading && activeSubscription")
      Loading(v-if="appLoading")
      Updating(v-if="appUpdating")
    Drawer
    DrawerOverlay
    Modal(v-if="modalContent")
    ModalOverlay(v-if="modalContent")
    EmptyPage(v-if="!appLoading && !activeSubscription")
</template>

<script>
import Header from './components/header/Header.vue'
import Loading from './components/loading/Loading.vue'
import Updating from './components/Updating/Updating.vue'
import Drawer from './components/drawer/Drawer.vue'
import DrawerOverlay from './components/drawer/DrawerOverlay.vue'
import Modal from './components/modal/Modal.vue'
import ModalOverlay from './components/modal/ModalOverlay.vue'
import EmptyPage from './pages/EmptyPage.vue'
import { loadRechargeData } from './assets/js';
import { mapGetters, mapMutations } from 'vuex';
export default {
  components: {
    Header,
    Loading,
    Updating,
    Drawer,
    DrawerOverlay,
    Modal,
    ModalOverlay,
    EmptyPage
  },
  computed: {
    ...mapGetters('ui', ['appLoading', 'appUpdating', 'modalContent']),
    ...mapGetters('subscriptions', ['activeSubscription'])
  },
  mounted() {
    loadRechargeData(VuePortal.customerHash)
  }
}
</script>

<style scoped>
@import './assets/css/settings/index.css';
@import './assets/css/tools/index.css';
.vp {
  display: flex;
  flex-direction: column;
}
.vp__content {
  flex: 1 0 auto;
  padding: 40px 0;
  background: $white;
  margin: 0 auto;
  width: 100%;
}
.vp__container {
  padding: 0 20px;
  max-width: 1015px;
  margin: auto;
}
</style>
