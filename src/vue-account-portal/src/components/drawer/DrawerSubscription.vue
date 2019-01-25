<template lang="pug">
	.vp-drawer__inner
		.vp-drawer__header
			h2.vp-h2.vp-drawer__h2 Edit Subscription
		.vp-drawer__saved(
			v-if="saved"
		)
			span.vp-drawer__savedIcon(
				v-html="checkBadge"
			)
			.vp-drawer__savedText Subscription Saved
		DrawerSubscriptionForm(
			@saved="markSaved"
		)
</template>

<script>
import DrawerSubscriptionForm from './DrawerSubscriptionForm.vue'
import { checkBadge } from '../../assets/svg'

export default {
  data() {
    return {
      saved: false,
      checkBadge
    }
  },
  components: {
    DrawerSubscriptionForm
  },
  methods: {
    markSaved() {
      this.saved = true
    }
  }
}
</script>

<style scoped></style>
