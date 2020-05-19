import React from 'react'
import cn from 'classnames'
import { func, bool } from 'prop-types'
import { Edit } from 'components/Icon/constants'
import withStyles from 'lib/withStyles'
import s from './ChangeShippingAddressButton.module.scss'

const ChangeShippingAddressButton = ({ onClick, isDisabled }) => (
  <a
    className={cn(s.changeButton, { [s.isDisabled]: isDisabled })}
    onClick={onClick}
  >
    <Edit className={s.icon} />
  </a>
)

ChangeShippingAddressButton.propTypes = {
  onClick: func.isRequired,
  isDisabled: bool,
  t: func.isRequired
}

export default withStyles(s)(ChangeShippingAddressButton)
