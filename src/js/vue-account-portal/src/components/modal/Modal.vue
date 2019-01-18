<template lang="pug">
	.vp-modal
		.vp-modal__content(
		v-if="modalContent"
		)
			span.vp-modalClose(
				@click="closeModal"
				v-html="closeBlue"
			)
			component.o-flexColumn.o-flex--startCenter(
				:is="ModalComponent"
			)
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { closeBlue } from "../../assets/svg";

const ModalComponents = {
  ModalCancel: require("./ModalCancel.vue").default,
  ModalCancelConfirm: require("./ModalCancelConfirm.vue").default
};

export default {
  data() {
    return {
      closeBlue
    };
  },
  computed: {
    ...mapGetters("ui", ["modalContent"]),
    ModalComponent() {
      return this.modalContent ? ModalComponents[this.modalContent] : "";
    }
  },
  methods: {
    ...mapMutations("ui", ["closeModal"])
  }
};
</script>

<style scoped>
@import "../../assets/css/settings";
@import "../../assets/css/tools";

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
.slide-leave,
.slide-enter-to {
  transform: translateX(0);
}
.vp-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 101;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
}
.vp-modal__content {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: scroll;
  padding: 40px;
  background-color: $color-white;
  @media (--tablet) {
    position: relative;
    top: unset;
    left: unset;
    right: unset;
    bottom: unset;
    width: 100%;
    max-width: 600px;
    max-height: 100vh;
    border-radius: 10px;
  }
}
.vp-modalClose {
  position: absolute;
  top: 15px;
  right: 20px;
  width: 20px;
  height: 15px;
  transition: opacity 0.3s ease;
  & >>> svg {
    width: 100%;
    height: 100%;
  }
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
}
</style>