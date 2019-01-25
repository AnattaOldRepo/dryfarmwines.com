<template lang="pug">
	.vp-drawer__inner
		.vp-drawer__header
			h2.vp-h2.vp-drawer__h2 Edit Products
			.vp-drawer__savedText Subscription Saved
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('subscriptions', ['updateAllSubscriptions'])
  }
}
</script>

<style scoped></style>
