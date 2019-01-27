<template>
  <component
    :is="!isLink ? 'button' : 'a'"
    :href="isLink ? href : null"
    :class="[
      'c-rButton',
      {'c-rButton--secondary': secondary}
    ]"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    secondary: Boolean,
    isLink: Boolean,
    href: String
  }
}
</script>

