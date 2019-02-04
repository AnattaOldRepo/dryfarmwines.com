<template>
  <div class="c-cardWrapper">
    <h2 class="c-cardWrapper__title">{{ title }}</h2>
    <div class="c-cardWrapper__cards">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variables';

.c-cardWrapper {
  margin: 0 0 3em;
}

.c-cardWrapper__cards {
  border: 1px solid $light-gray;
}
</style>
