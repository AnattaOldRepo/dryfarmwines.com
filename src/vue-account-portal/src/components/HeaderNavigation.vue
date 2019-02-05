<template>
  <div class="c-rHeader">
    <div class="c-rHeader__inner c-rHeader__inner--desktop">
      <nav class="c-rHeaderNav">
        <a
          class="c-rHeaderNav__item"
          href="/account"
        >
          <svg
            style="margin-right:5px;"
            width="17px"
            height="10px"
            viewBox="0 0 17 10"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <polygon
                id="back-to-account-path-1"
                points="20.414 10.707 7.828 10.707 10.121 8.414 8.707 7 4 11.707 8.707 16.414 10.121 15 7.828 12.707 20.414 12.707"
              ></polygon>
            </defs>
            <g
              id="Account-Page"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g
                id="swap-product-subscription-page"
                transform="translate(-191.000000, -169.000000)"
              >
                <g
                  id="navigation"
                  transform="translate(187.000000, 156.000000)"
                >
                  <g
                    id="Group-4"
                    transform="translate(0.000000, 6.000000)"
                  >
                    <g id="sub-nav">
                      <g id="back-to-account">
                        <g id="Icon/Back">
                          <rect
                            id="Bounding-Box"
                            x="0"
                            y="0"
                            width="24"
                            height="24"
                          ></rect>
                          <mask
                            id="back-to-account-mask-2"
                            fill="white"
                          >
                            <use xlink:href="#back-to-account-path-1"></use>
                          </mask>
                          <g id="Mask"></g>
                          <g
                            id="Mixin/Fill/Black"
                            mask="url(#back-to-account-mask-2)"
                            class="svg-color"
                            fill="#000000"
                            fill-rule="evenodd"
                          >
                            <rect
                              id="Rectangle"
                              x="0"
                              y="0"
                              width="24"
                              height="24"
                            ></rect>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <span>Back to Account</span>
        </a>

        <router-link
          v-if="!onCardUpdatePage"
          class="c-rHeaderNav__item"
          :to="{ name: 'SubscriptionPage', params: {} }"
          exact
        >
          Your Subscription</router-link>
        <router-link
          v-if="!onCardUpdatePage"
          class="c-rHeaderNav__item"
          :to="{ name: 'DetailsPage', params: {} }"
        >
          Your Details</router-link>
        <router-link
          v-if="!onCardUpdatePage"
          class="c-rHeaderNav__item"
          :to="{ name: 'HistoryPage', params: {} }"
        >
          Subscription History</router-link>

        <a
          v-if="onCardUpdatePage"
          class="c-rHeaderNav__item"
          :href="resetSubscriptionURL"
          exact
        >
          Your Subscription</a>
        <a
          v-if="onCardUpdatePage"
          class="c-rHeaderNav__item"
          :href="resetDetailsURL"
        >
          Your Details</a>
        <a
          v-if="onCardUpdatePage"
          class="c-rHeaderNav__item"
          :href="resetHistoryURL"
        >
          Subscription History</a>
      </nav>

      <base-button
        class="c-rHeaderNav__button"
        component-is="a"
        href="/account/logout"
        @click.prevent="logout"
        secondary
      >
        <div>
          Sign Out
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 492.004 492.004"
            style="enable-background:new 0 0 492.004 492.004;"
            xml:space="preserve"
          >
            <g>
              <g>
                <path d="M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136
                                c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002
                                v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864
                                c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872
                                l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z" />
              </g>
            </g>
          </svg>
        </div>
      </base-button>
    </div>

    <div class="c-rHeader__inner c-rHeader__inner--mobile js-expand-wrapper">
      <a
        class="c-rBackToAccount"
        href="/account"
      >
        <span>Back to Account</span>
      </a>

      <div class="c-rHeaderExpand js-expand-trigger">
        <span>Subscription</span>
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="306px"
          height="306px"
          viewBox="0 0 306 306"
          xml:space="preserve"
        >
          <polygon points="94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153 		"></polygon>
        </svg>
      </div>

      <div
        class="js-expand-content is-closed"
        v-if="customerHash"
        style="
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                "
      >
        <nav class="c-rHeaderNav">
          <router-link
            v-if="!onCardUpdatePage"
            class="c-rHeaderNav__item"
            :to="{ name: 'SubscriptionPage', params: {} }"
            exact
          >
            Your Subscription</router-link>
          <router-link
            v-if="!onCardUpdatePage"
            class="c-rHeaderNav__item"
            :to="{ name: 'DetailsPage', params: {} }"
          >
            Your Details</router-link>
          <router-link
            v-if="!onCardUpdatePage"
            class="c-rHeaderNav__item"
            :to="{ name: 'HistoryPage', params: {} }"
          >
            Subscription History</router-link>

          <a
            v-if="onCardUpdatePage"
            class="c-rHeaderNav__item"
            :href="resetSubscriptionURL"
            exact
          >
            Your Subscription</a>
          <a
            v-if="onCardUpdatePage"
            class="c-rHeaderNav__item"
            :href="resetDetailsURL"
          >
            Your Details</a>
          <a
            v-if="onCardUpdatePage"
            class="c-rHeaderNav__item"
            :href="resetHistoryURL"
          >
            Subscription History</a>
        </nav>

        <base-button secondary>
          <a
            class="c-rHeaderNav__button"
            href="/account/logout"
          >
            <div>
              <span>Sign Out</span>
            </div>
          </a>
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { rechargeURL, siteURL, previewThemeQuery } from '@/config'

function hasItem(sKey) {
  // console.log('hasItem', sKey)
  if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
    return false
  }
  return new RegExp(
    '(?:^|;\\s*)' +
      encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
      '\\s*\\='
  ).test(document.cookie)
}

function removeItem(sKey, sPath, sDomain) {
  // console.log('rItem, sKey', sKey)
  // console.log('rItem, sPath', sPath)
  // console.log('rItem, sDomain', sDomain)

  if (!hasItem(sKey)) {
    return false
  }
  document.cookie =
    encodeURIComponent(sKey) +
    '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
    (sDomain ? '; domain=' + sDomain : '') +
    (sPath ? '; path=' + sPath : '')
  return true
}

export default {
  name: 'HeaderNavigation',

  data: function() {
    return {
      test: 'tests'
    }
  },

  computed: {
    ...mapState(['customerHash']),

    onCardUpdatePage() {
      if (
        document.location.pathname.indexOf('card') >= 0 ||
        document.location.pathname.indexOf('edit') >= 0
      ) {
        return true
      } else {
        return false
      }
    },

    resetSubscriptionURL() {
      return `${rechargeURL}${this.customerHash}${previewThemeQuery}`
    },

    resetDetailsURL() {
      return `${rechargeURL}${this.customerHash}${previewThemeQuery}/#/details`
    },

    resetHistoryURL() {
      return `${rechargeURL}${this.customerHash}${previewThemeQuery}/#/history`
    }
  },

  methods: {
    logout() {
      removeItem('dryfarmwines_analytics', '/', '.dryfarmwines.com')
      this.$nextTick(() => {
        window.location = `${siteURL}/account/logout`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variables';

.c-rHeader {
  background: $header-background-color;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }
}
// on mobile
.c-rBackToAccount {
  width: calc(100% + 60px);
  text-align: center;
  margin-left: -30px;
  margin-right: -30px;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 27px 0 24px;

  span {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 2px;
    transition: color 0.3s ease;
  }

  svg {
    margin-right: 12px;
    margin-bottom: 5px;

    .svg-color {
      fill: #000;
    }
  }
}

.c-rHeader__inner {
  &--desktop {
    display: none;

    @media (min-width: 1024px) {
      max-width: 1100px;
      display: flex;
      padding: 3em 1.618em;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &--mobile {
    display: flex;
    flex-direction: column;
    padding: 2px 30px 16px;

    @media (min-width: 1024px) {
      display: none;
    }
  }
}

.c-rHeaderExpand {
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  // margin-left: -30px;
  // margin-right: -30px;
  // width: calc(100% + 60px);
  padding: 26px 0 12px;
  max-width: 400px;
  border-bottom: none;
  cursor: pointer;
  margin: 0 auto;

  &.is-open {
    border-bottom: 1px solid #dcdcdc;
    padding-bottom: 26px;

    svg {
      transform: rotate(270deg);
    }
  }

  span {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 2px;
    line-height: 1;
  }

  svg {
    margin-bottom: 3px;
    margin-left: 10px;
    width: 14px;
    height: 14px;
    transform: rotate(90deg);
  }
}

.c-rHeaderNav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 818px;

  @media (max-width: 1023px) {
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
    flex-direction: column;
  }
}

.c-rHeaderNav__item {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 2px;
  transition: color 0.3s ease;
  width: auto;
  white-space: nowrap;
  text-align: center;
  color: #000;

  @media (max-width: 1023px) {
    width: 100%;
    padding: 18px 0 14px;
    text-align: center;
    border-bottom: 1px solid #dcdcdc;
  }

  svg .svg-color {
    transition: all 0.3s ease;
    fill: #000;
  }

  &.router-link-active,
  &:hover,
  &:active,
  &:focus {
    color: #ee2e2d;

    svg .svg-color {
      fill: #ee2e2d;
    }
  }
}

.c-rHeaderNav__button {
  display: block;
  color: #fff;

  @media (max-width: 1023px) {
    margin-top: 21px;
    margin-bottom: 20px;
  }

  svg {
    fill: #fff;
    width: 10px;
    height: 10px;
    margin-left: 7px;
    margin-bottom: 1px;
    transition: all 0.3s ease;
    transform: rotate(0);
    transform-origin: none;
  }
}
</style>
