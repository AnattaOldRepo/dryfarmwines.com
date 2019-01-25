<template lang="pug">
	transition(
		name="fade"
	)
		.vp-modalOverlay(
			v-if="modalContent"
		)
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('ui', ['modalContent'])
  }
}
</script>

<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-leave,
.fade-enter-to {
  opacity: 1;
}
.vp-modalOverlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s ease;
}
</style>
