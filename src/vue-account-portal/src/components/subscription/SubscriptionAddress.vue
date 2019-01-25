<template lang="pug">
	.vp-card
		a.vp-card__block(
			@click="setDrawer('DrawerShipping')"
		)
			h4.vp-card__heading Shipping Address
			p.vp-card__text
				span(
					v-for="(line, index) in cleanShipping"
					v-if="line"
					:key="index"
				) {{ line }} #[br]
			span.vp-card__arrow(
			v-html="chevronBlue"
			)
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { cleanAddress, isEmptyObject } from '../../assets/js'
import { chevronBlue } from '../../assets/svg'
export default {
  data() {
    return {
      chevronBlue
    }
  },
  computed: {
    ...mapGetters('addresses', ['activeAddress']),
    cleanShipping() {
      return cleanAddress(this.activeAddress)
    }
  },
  methods: {
    ...mapMutations('ui', ['setDrawer'])
  }
}
</script>
