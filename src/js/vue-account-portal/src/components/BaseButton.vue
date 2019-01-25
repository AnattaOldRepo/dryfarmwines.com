<template>
  <button
    class="u-btn u-btn--greenLight"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<style scoped>
@import '../assets/css/index.css';
</style>