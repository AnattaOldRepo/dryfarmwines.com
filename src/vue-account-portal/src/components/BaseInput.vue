<template>
  <label>
    {{ label }}
    <input class="input" v-bind="$attrs" :value="value" v-on="inputListeners" />
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      required: true
    },
    label: String
  },
  computed: {
    inputListeners() {
      var vm = this
      return {
        // We add all the listeners from the parent
        ...this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        // This ensures that the component works with v-model
        input: event => vm.$emit('input', event.target.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  font-family: Avenir;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0;
  color: #7f7f7f;
  border: 1px solid #d7d7d7;
  background-color: #fff;
  padding: 6px;
}
</style>
