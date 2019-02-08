<template>
  <component
    :is="!presentational ? componentIs : 'div'"
    :href="isLink || componentIs === 'a' ? href : null"
    :to="componentIs === 'router-link' ? to : null"
    :tag="tag"
    v-on="$listeners"
    :aria-label="ariaLabel"
    :class="[
      'c-cardItem',
      {'has-pointer': !presentational}
    ]"
  >
    <div class="c-cardItem__wrapper">
      <div
        v-if="title"
        class="c-cardItem__title"
      >
        {{ title }}
      </div>
      <div class="c-cardItem__content">
        <slot />
      </div>
      <base-chevron-right
        class="c-cardItem__chevron"
        v-if="!presentational"
      />
    </div>
  </component>
</template>

<script>
export default {
  props: {
    title: String,
    ariaLabel: {
      type: String,
      default: ''
    },
    tag: String,
    componentIs: {
      type: String,
      default: 'button',
      validator: v => ['button', 'a', 'router-link'].includes(v)
    },
    to: String,
    isLink: Boolean,
    isRouterLink: Boolean,
    presentational: Boolean,
    href: String
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/components/base-card-item";
</style>
