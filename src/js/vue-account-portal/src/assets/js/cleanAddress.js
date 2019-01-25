import { parsePhoneNumber } from 'libphonenumber-js'
import { isEmptyObject } from './isEmptyObject'

export const cleanAddress = (rawAddress, type) => {
  const address = { ...rawAddress }
  if (!isEmptyObject(address)) {
    if (type === 'billing') {
      Object.keys(address).forEach(key => {
        address[key.replace('billing_', '')] = address[key]
      })
    }
    const formatPhone = () => {
      try {
        const phoneNumber = parsePhoneNumber(address.phone, 'US')
        return phoneNumber.formatNational()
      } catch {
        return address.phone
      }
    }
    return {
      fullName: `${address.first_name} ${address.last_name}`,
      line1: address.address1,
      line2: address.address2,
      company: address.company,
      cityStateZip: `${address.city}, ${address.province}, ${address.zip}`,
      country: address.country,
      phone: formatPhone()
    }
  }
}
