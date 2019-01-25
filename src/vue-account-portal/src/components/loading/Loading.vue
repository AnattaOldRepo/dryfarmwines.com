<template lang="pug">
	.vp-loading.o-flex.o-flex--centerCenter
		.vp-loading__inner
			h2.vp-loading__text Loading Your Account
			LoadingDots
</template>

<script>
import LoadingDots from './LoadingDots.vue'
export default {
  components: {
    LoadingDots
  }
}
</script>

<style scoped>
.vp-loading {
  min-height: 480px;
  padding-bottom: 20px;
}
.vp-loading__text {
  font-size: 30px;
  margin-bottom: 20px;
}
</style>
