export const formatAddresses = rawAddresses => {
  let addressesObject = {}
  rawAddresses.forEach(address => {
    addressesObject[address.id] = address
  })
  return addressesObject
}
