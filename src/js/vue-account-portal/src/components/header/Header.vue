<template lang="pug">
	header.vp-header
		.u-showTabletLargeUp
			MainNavigation
		.u-hideTabletLargeUp
			MobileNavigation
</template>

<script>
import MainNavigation from "./MainNavigation.vue";
import MobileNavigation from "./MobileNavigation.vue";

export default {
  components: {
    MainNavigation,
    MobileNavigation
  }
};
</script>

<style scoped>
.vp-header {
  background: #0d2944;
  z-index: 0;
}
</style>