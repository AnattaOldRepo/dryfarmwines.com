<template>
  <div
    v-if="isShown"
    class="c-overlay"
    @click="isShown = false"
  >
    <div class="c-modal">
      <div>Product Image</div>
      <form>
        <div>Product Title</div>
        <base-input label="Choose your delivery frequency" />
        <base-input label="Varietal" />
        <base-input label="Address" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShown: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.c-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.25);
}

.c-modal {
  margin: 1.618em;
  padding: 1.618em;
  height: 100%;
  width: 100%;
  max-height: 500px;
  max-width: 600px;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0 8px 80px -22px rgba(0, 0, 0, 0.33);
}
</style>
