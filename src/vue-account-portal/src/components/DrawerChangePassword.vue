<template>
  <form @submit.prevent="changePassword">
    <span class="c-rDrawer__title">Change Password</span>
    <base-input type="text" placeholder="New Password" v-model="newPassword" />
    <base-input
      type="text"
      placeholder="Password Confirmation"
      v-model="passwordConfirmation"
    />
    <base-button center>Update Password</base-button>
  </form>
</template>

<script>
// import axios from 'axios'
// import { mapState } from 'vuex'

export default {
  data: () => ({
    newPassword: '',
    passwordConfirmation: ''
  }),

  // computed: {
  //   ...mapState(['customer'])
  // },

  methods: {
    changePassword() {
      return
      // if (this.newPassword === this.passwordConfirmation) {
      //   const newPasswordBody = {
      //     customer: {
      //       id: this.customer.shopify_customer_id,
      //       password: this.newPassword,
      //       password_confirmation: this.passwordConfirmation
      //     }
      //   }

      //   axios.get('/admin/customers.json').then(res => console.log(res))

      //   // axios.post(`/admin/customers/${this.customer.shopify_customer_id}.json`, newPasswordBody).then(res => {
      //   //   console.log(res)
      //   // })
      // } else {
      //   console.log("Passwords don't match")
      // }
    }
  }
}
</script>
