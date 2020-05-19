import React from 'react'
import { map } from 'ramda'

import { AddressesShape } from 'app/shapes'

import withStyles from 'lib/withStyles'
import ShippingAddressEntry from '../ShippingAddressEntry'
import ShippingAddressAddEntry from '../ShippingAddressAddEntry'
import s from './ShippingAddressList.module.scss'

const ShippingAddressList = ({ addresses }) => (
  <div className={s.addressList}>
    {map(
      address => (
        <ShippingAddressEntry key={address.id} details={address} />
      ),
      addresses
    )}
    <ShippingAddressAddEntry />
  </div>
)

ShippingAddressList.propTypes = {
  addresses: AddressesShape
}

ShippingAddressList.defaultProps = {
  addresses: []
}

export default withStyles(s)(ShippingAddressList)
