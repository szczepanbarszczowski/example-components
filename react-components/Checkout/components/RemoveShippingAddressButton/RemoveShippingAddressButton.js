import React from 'react'
import cn from 'classnames'
import { func } from 'prop-types'
import { Delete } from 'components/Icon/constants'
import withStyles from 'lib/withStyles'
import s from './RemoveShippingAddressButton.module.scss'

const RemoveShippingAddressButton = ({ onClick }) => (
  <a className={cn(s.link)} onClick={onClick}>
    <Delete className={s.icon} />
  </a>
)

RemoveShippingAddressButton.propTypes = {
  onClick: func.isRequired
}

export default withStyles(s)(RemoveShippingAddressButton)
