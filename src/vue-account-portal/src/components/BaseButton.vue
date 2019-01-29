<template>
  <component
    :is="!isLink ? 'button' : 'a'"
    :href="isLink ? href : null"
    :class="[
      'button',
      {'button--secondary': secondary}
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

<style lang="sass" scoped>
@import '../assets/css/variables'

.button
  background-color: $primary-color
  color: $white
  text-transform: uppercase
  font-size: 13px
  line-height: 1
  letter-spacing: 2px
  padding: 10px 30px
  text-align: center
  font: inherit
  font-weight: 700
  border: none
  border-radius: 2px
  transition: all 0.3s ease
  cursor: pointer

  &:hover,
  &:active,
  &:focus
    svg .svg-color
      fill: $white

  > div
    display: flex
    justify-content: center
    align-items: center

.button--secondary
    background-color: $secondary-color

    &:hover,
    &:active,
    &:focus
      opacity: 0.7
      color: $white
</style>


