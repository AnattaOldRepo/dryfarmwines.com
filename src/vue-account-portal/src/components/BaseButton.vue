<template>
  <div class="button__wrapper">
    <component
      :is="!isLink ? 'button' : 'a'"
      :href="isLink ? href : null"
      :class="[
        'button',
        {'button--secondary': secondary},
        {'is-centered': center},
        {'is-long-button': longButton},
        {'button--disabled': disabled}
      ]"
      v-on="$listeners"
    >
      <slot />
    </component>
  </div>
</template>

<script>
export default {
  props: {
    secondary: Boolean,
    center: Boolean,
    longButton: Boolean,
    isLink: Boolean,
    disabled: Boolean,
    href: String
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variables';

.button__wrapper {
  display: flex;
}

.button {
  background-color: $primary-color;
  font-family: 'Open Sans';
  color: $white;
  text-transform: uppercase;
  font-size: 14px !important;
  line-height: 1;
  letter-spacing: 2px;
  padding: 8px 20px;
  text-align: center;
  font: inherit;
  font-weight: 700;
  border: none;
  border-radius: 2px;
  transition: all 0.3s ease;
  cursor: pointer;

  &.is-centered {
    margin: auto;
  }

  &.is-long-button {
    width: 100%;
  }

  &:hover,
  &:active,
  &:focus {
    svg .svg-color {
      fill: $white;
    }
  }

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.button--secondary {
  background-color: $secondary-color;

  &:hover,
  &:active,
  &:focus {
    opacity: 0.7;
    color: $white;
  }
}

.button--disabled {
  background-color: $disabled-color;
  cursor: default;
  pointer-events: none;
  user-select: none;
}
</style>


