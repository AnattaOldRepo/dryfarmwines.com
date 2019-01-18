<template lang="pug">
	.vp-updating__dots
		.vp-updating__dot(
			v-for="n in 5"
			:key="n"
			:style="animationDelay(n)"
		)
</template>

<script>
export default {
  methods: {
    animationDelay(n) {
      return {
        animationDelay: `${0.2 * n}s`
      };
    }
  }
};
</script>

<style scoped>
@keyframes dotAnimate {
  0% {
    background-color: rgba(255, 255, 255, 0.3);
  }
  20% {
    background-color: rgba(255, 255, 255, 1);
  }
  100% {
    background-color: rgba(255, 255, 255, 0.3);
  }
}

.vp-updating__dots {
  display: flex;
  justify-content: center;
  width: 100%;
}
.vp-updating__dot {
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  transform-origin: 50% 50%;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0 6px;
  animation: dotAnimate 1.4s infinite;
}
</style>