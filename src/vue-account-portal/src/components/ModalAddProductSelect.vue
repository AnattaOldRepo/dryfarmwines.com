<template>
  <label>
    {{ label }}
    <select
      v-on="$listeners"
      :name="label"
    >
      <option
        v-for="{value, displayValue} in options"
        :key="value"
        :value="value"
      >
        {{ displayValue }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    values: {
      type: Array,
      required: true
    },
    displayValues: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    options() {
      const { values, displayValues } = this

      const baseArr =
        values.length >= displayValues.length ? values : displayValues

      return baseArr.map((v, i) => ({
        value: values[i],
        displayValue: displayValues[i] || values[i]
      }))
    }
  }
}
</script>
