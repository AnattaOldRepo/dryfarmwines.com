<template lang="pug">
	.vp-updating.o-flex.o-flex--centerCenter
		.vp-updating__inner
			h2.vp-updating__text Updating Your Account
			UpdatingDots
</template>

<script>
import UpdatingDots from './UpdatingDots.vue'
export default {
  components: {
    UpdatingDots
  }
}
</script>

<style scoped>
@import '../../assets/css/settings';

.vp-updating {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 40, 86, 0.75);
  z-index: 200;
}
.vp-updating__text {
  color: $white;
  font-size: 30px;
  margin-bottom: 20px;
}
</style>
