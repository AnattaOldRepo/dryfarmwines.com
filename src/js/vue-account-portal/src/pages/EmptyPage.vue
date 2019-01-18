<template lang="pug">
	.vp-empty
		h2.vp-h2 Your Subscription
		p.vp-empty__text You do not have any active subscriptions.  Visit our shop to signup.
		a.vp-card__button.u-btn.u-btn--greenLight(
			href="https://athleticgreens.com"
		) Visit Shop
</template>

<script>
export default {};
</script>

<style scoped>
@import "../assets/css/index.css";
.vp-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vp-h2 {
  text-align: center !important;
}
</style>
