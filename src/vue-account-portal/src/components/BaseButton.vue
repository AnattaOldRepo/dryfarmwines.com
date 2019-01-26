<template>
  <button
    :class="[
      'c-button',
      {'c-button--secondary': secondary}
    ]"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    secondary: Boolean
  }
}
</script>


<style scoped>
@import '../assets/css/index.css';
</style>