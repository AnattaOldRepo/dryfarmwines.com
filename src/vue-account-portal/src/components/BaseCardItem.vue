<template>
  <component
    :is="tag"
    :href="tag === 'a' ? href : null"
    class="vp-card__block vp-card__block--isLink vp-card__block--hasBorder"
    v-on="$listeners"
    :aria-label="ariaLabel"
  >
    <h4
      v-if="heading"
      class="vp-card__heading"
    >
      {{ heading }}
    </h4>
    <div :class="['vp-card__text', {'vp-card__text--large': hasLargeText}]">
      <slot />
    </div>
    <span
      v-if="!presentational"
      class="vp-card__arrow"
      v-html="chevronBlue"
    />
  </component>
</template>

<script>
import { chevronBlue } from '../assets/svg'

export default {
  props: {
    heading: String,
    ariaLabel: String,
    hasLargeText: Boolean,
    presentational: Boolean,
    tag: {
      type: String,
      default: 'button',
      validator: v => ['button', 'a', 'div', 'span'].includes(v)
    },
    href: String
  },

  data: () => ({ chevronBlue })
}
</script>

