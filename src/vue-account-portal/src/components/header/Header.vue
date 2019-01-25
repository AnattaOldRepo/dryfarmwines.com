<template lang="pug">
	header.vp-header
		.u-showTabletLargeUp
			MainNavigation
		.u-hideTabletLargeUp
			MobileNavigation
</template>

<script>
import MainNavigation from './MainNavigation.vue'
import MobileNavigation from './MobileNavigation.vue'

export default {
  components: {
    MainNavigation,
    MobileNavigation
  }
}
</script>

<style scoped>
@import '../../assets/css/settings';
.vp-header {
  background: $light-gray;
  z-index: 0;
}
</style>
