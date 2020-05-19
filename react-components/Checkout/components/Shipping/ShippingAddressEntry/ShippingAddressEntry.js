import React from 'react'
import { object, bool, func } from 'prop-types'
import cn from 'classnames'
import AddressDetails from 'components/AddressDetails'
import withStyles from 'lib/withStyles'
import ShippingAddressEntryCheck from '../ShippingAddressEntryCheck'
import ChangeShippingAddressButton from '../../ChangeShippingAddressButton'
import RemoveShippingAddressButton from '../../RemoveShippingAddressButton'
import s from './ShippingAddressEntry.module.scss'

const ShippingAddressEntry = ({ details, checked, onClick }) => {
  const { id } = details
  return (
    <div
      role="button"
      onClick={onClick}
      className={cn(s.addressEntryWrapper, { [s.checked]: checked })}
    >
      <ShippingAddressEntryCheck id={id} />
      <AddressDetails details={details} />
      <div className={s.controls}>
        <ChangeShippingAddressButton id={id} />
        <RemoveShippingAddressButton id={id} checked={checked} />
      </div>
    </div>
  )
}

ShippingAddressEntry.propTypes = {
  checked: bool,
  details: object,
  onClick: func
}

export default withStyles(s)(ShippingAddressEntry)
