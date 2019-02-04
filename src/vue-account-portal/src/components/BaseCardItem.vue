<template>
  <component
    :is="!presentational ? componentIs : 'div'"
    :href="isLink || componentIs === 'a' ? href : null"
    :to="componentIs === 'router-link' ? to : null"
    :tag="tag"
    v-on="$listeners"
    :aria-label="ariaLabel"
    :class="['c-cardItem', { 'has-pointer': !presentational }]"
  >
    <div class="c-cardItem__wrapper">
      <div v-if="title" class="c-cardItem__title">
        {{ title }}
      </div>
      <div class="c-cardItem__content">
        <slot />
      </div>
      <base-chevron-right class="c-cardItem__chevron" v-if="!presentational" />
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
@import '../assets/css/variables';

.c-cardItem {
  display: block;
  padding: 0;
  width: 100%;
  background: none;
  text-align: left;
  text-transform: none;
  font-size: 14px;
  color: $dark-text;

  &.has-pointer {
    cursor: pointer;
  }

  &:not(:last-of-type) .c-cardItem__wrapper {
    border-bottom: 1px solid $light-gray;
  }
}

.c-cardItem__wrapper {
  width: calc(100% - 3.236em);
  margin: auto;
  padding: 1.618em 0;
  display: grid;
  grid-template-columns: 1fr auto;
}

.c-cardItem__title {
  width: 100%;
  font-weight: 700;
  grid-column: 1 / 2;
  text-transform: uppercase;
  padding: 0;
  margin-bottom: 0.618em;
}

.c-cardItem__content {
  margin-right: auto;
  grid-column: 1 / 2;
  font-weight: normal;
  line-height: 1.5;
}

.c-cardItem__chevron {
  height: 100%;
  grid-column: 2 / 3;
  grid-row: 1 / 3;
}
</style>
