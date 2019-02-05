<template>
  <label>
    {{ label }}
    <select
      v-on="$listeners"
      :name="label"
    >
      <option
        v-for="value in values"
        :key="value"
        :value="value"
      >
        {{ value }}
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
    }
  }
}
</script>
