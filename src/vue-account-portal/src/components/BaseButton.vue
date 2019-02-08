<template>
  <div class="button__wrapper">
    <component
      :is="!href ? !to ? 'button' : 'router-link' : 'a'"
      :href="href ? href : null"
      :to="to ? to : null"
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
    disabled: Boolean,
    href: String,
    to: [String, Object]
  }
}
</script>

<style lang="scss" scoped>
.button__wrapper {
  display: flex;
}

.button {
  background-color: $primary-color;
  font-family: $secondary-font;
  color: $white;
  text-transform: uppercase;
  font-size: 14px !important;
  line-height: 1;
  letter-spacing: 2px;
  padding: 5px 15px;
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


