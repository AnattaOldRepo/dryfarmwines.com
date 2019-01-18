<template lang="pug">
		.vp-card
			.vp-card__block
				h4.vp-card__heading Paused
				p.vp-card__text.vp-card__text--large {{ itemCount }}
			SubscriptionListItem(
				v-for="(subscription, index) in subscriptions"
				:key="index"
				:item="subscription"
			)
</template>

<script>
import SubscriptionListItem from "./SubscriptionListItem.vue";
import { isEmptyObject } from "../../assets/js";
import { chevronBlue } from "../../assets/svg";
export default {
  props: {
    subscriptions: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    SubscriptionListItem
  },
  data() {
    return {
      isEmptyObject,
      chevronBlue
    };
  },
  computed: {
    itemCount() {
      const length = Object.keys(this.subscriptions).length;
      return length === 1 ? "1 Item" : `${length} Items`;
    }
  }
};
</script>

<style scoped>
.vp-item {
  display: flex;
  align-items: center;
}
.vp-item__imageBox {
  width: 50px;
  margin-right: 10px;
}
.vp-item__text {
  flex: 1;
  font-size: 14px;
}
.vp-item__total {
  margin: 5px 0;
  font-size: 17px;
}
</style>
