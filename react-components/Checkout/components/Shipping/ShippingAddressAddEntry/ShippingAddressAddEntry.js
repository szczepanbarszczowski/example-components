import React from 'react'
import { func } from 'prop-types'
import { Plus } from 'components/Icon/constants'
import withStyles from 'lib/withStyles'
import s from './ShippingAddressAddEntry.module.scss'

const ShippingAddressAddEntry = ({ t, onClick }) => (
  <div className={s.addEntry} onClick={onClick}>
    <Plus className={s.icon} />
    {t('add_new_address')}
  </div>
)

ShippingAddressAddEntry.propTypes = {
  onClick: func,
  t: func
}

export default withStyles(s)(ShippingAddressAddEntry)
