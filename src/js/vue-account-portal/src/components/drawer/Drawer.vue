<template lang="pug">
  transition(
    name="slide"
  )
    .vp-drawer(
      v-if="drawerContent"
    )
      span.vp-drawerClose(
        @click="closeDrawer"
        v-html="closeBlue"
      )
      component.o-flexColumn.o-flex--startCenter(
        :is="DrawerComponent"
      )
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { closeBlue } from "../../assets/svg";

const DrawerComponents = {
  DrawerProducts: require("./DrawerProducts.vue").default,
  DrawerDate: require("./DrawerDate.vue").default,
  DrawerInterval: require("./DrawerInterval.vue").default,
  DrawerShipping: require("./DrawerShipping.vue").default,
  DrawerSubscription: require("./DrawerSubscription.vue").default,
  DrawerBilling: require("./DrawerBilling.vue").default
};

export default {
  data() {
    return {
      closeBlue
    };
  },
  computed: {
    ...mapGetters("ui", ["drawerContent"]),
    DrawerComponent() {
      return this.drawerContent ? DrawerComponents[this.drawerContent] : "";
    }
  },
  methods: {
    ...mapMutations("ui", ["closeDrawer"])
  }
};
</script>

<style scoped>
@import "../../assets/css/settings";

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
.slide-leave,
.slide-enter-to {
  transform: translateX(0);
}
.vp-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 101;
  width: 365px;
  background-color: $color-gray;
  text-align: left;
  overflow-y: scroll;
  transition: transform 0.3s ease;
}
.vp-drawerClose {
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