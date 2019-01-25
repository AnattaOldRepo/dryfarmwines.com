import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './App.vue'
import DetailsPage from './pages/DetailsPage.vue'
import HistoryPage from './pages/HistoryPage.vue'
import SubscriptionPage from './pages/SubscriptionPage.vue'
import RetentionPage from './pages/RetentionPage.vue'

import store from './store'
import moment from 'moment'
import './assets/css/index.css'

Vue.use(VueRouter)
Vue.use(Vuex)

Vue.filter('formatDate', function(date, options) {
  if (date) {
    return moment(date).format(options)
  }
})

Vue.filter('formatMoney', function(money, missingDecimal = false) {
  if (money) {
    let price = money.toString()
    if (missingDecimal) {
      let dollars = price.substring(0, price.length - 2)
      let cents = price.substring(price.length - 2, price.length)
      price = `${dollars}.${cents}`
    }
    return `$${price.replace(/\.00$/, '')}`
  }
})

Vue.filter('doMath', function(value, value2, operator) {
  let result
  switch (operator) {
    case 'add':
      result = value + value2
      break
    case 'subtract':
      result = value - value2
      break
    case 'multiply':
      result = value * value2
      break
    case 'divide':
      result = value / value2
      break
  }
  return result
})

const routes = [
  {
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

const router = new VueRouter({ routes })

new Vue({
  name: 'VueAccountPortal',
  store,
  router,
  template: '<App />',
  components: { App },
  el: '#vue-account-portal'
})
