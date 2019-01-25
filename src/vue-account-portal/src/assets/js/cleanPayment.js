export const cleanPayment = payment => {
  if (payment) {
    return `*${payment.last4} ${payment.exp_month}/${payment.exp_year}`
  }
}
