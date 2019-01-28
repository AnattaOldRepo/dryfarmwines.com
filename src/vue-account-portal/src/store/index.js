import Vuex from 'vuex'
import Vue from 'vue'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import { rechargeURL } from '@/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: rechargeURL,
    customerHash: '',
    customer: {},
    orders: [],

    updateOverlay: false,
    modalOpen: false,
    drawerOpen: false,
    drawerContentType: '',

    deliverySchedule: [],
    activeDeliverySchedule: {},
    activeDeliveryScheduleIndex: null,
    activeFirstDeliverySubscription: null,
    activeDeliveryAddress: null,
    activeDeliveryAddressId: null,
    activeDeliveryScheduleAddress: null,
    activeDeliveryFrequency: null,
    activeDeliveryIntervalUnit: null,

    canceledFrequencyText: '',

    initialRechargeDataLoading: true,

    cancellationUpdating: false,

    frequencyUpdating: false,
    frequencySaved: false,

    addresses: [],
    addressUpdating: false,
    addressSaved: false,
    addressUpdateErrors: {},

    products: [],
    productEditDrawerUpdating: false,
    productEditDrawerSaved: false,
    updatingRemovingProduct: false,
    newProductAddedSaved: false,
    newProductAdded: {},

    skipShipmentUpdating: false,
    skipShipmentSaved: false,
    shipsOnUpdating: false,
    shipsOnSaved: false,

    subscriptions: [],
    subscriptionCanceled: false,
    canceledSubscriptionTitles: '',
    combineSubscriptionsUpdating: false,
    combineSubscriptionsSaved: false,
    subscriptionToSwap: null,
    subscriptionToSwapIndex: null
  },
  getters,
  mutations,
  actions
})
