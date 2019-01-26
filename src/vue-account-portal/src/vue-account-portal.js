import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'

import DetailsPage from './pages/DetailsPage.vue'
import HistoryPage from './pages/HistoryPage.vue'
import SubscriptionPage from './pages/SubscriptionPage.vue'
import RetentionPage from './pages/RetentionPage.vue'
import store from './store'

import 'babel-polyfill'

Vue.use(VueRouter)
Vue.use(Vuex)

Vue.mixin({
  data: function() {
    return {}
  },

  computed: {},

  methods: {
    isEmptyObject: function(object) {
      return Object.keys(object).length === 0
    },

    formatMoney(money) {
      var price = parseFloat(money)
      var priceWithDecimal = (price / 100.0).toFixed(2)
      var removedZeroPlaceholderDecimals = String(priceWithDecimal).replace(
        /\.00$/,
        ''
      )

      return '$' + String(removedZeroPlaceholderDecimals)
    }
  }
})

const routes = [
  {
    // default
    path: '/',
    name: 'SubscriptionPage',
    component: SubscriptionPage
  },
  {
    path: '/details',
    name: 'DetailsPage',
    component: DetailsPage
  },
  {
    path: '/history',
    name: 'HistoryPage',
    component: HistoryPage
  },
  {
    path: '/retention',
    name: 'RetentionPage',
    component: RetentionPage
  }
]

const router = new VueRouter({
  routes: routes
})

new Vue({
  name: 'VueAccountPortal',
  store,
  router,
  template: '<App />',
  components: { App },
  el: '#vue-account-portal'
})
