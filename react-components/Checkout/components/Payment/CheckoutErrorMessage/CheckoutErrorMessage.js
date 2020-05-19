import React from 'react'
import { string } from 'prop-types'

import withStyles from 'lib/withStyles'

import s from './CheckoutErrorMessage.module.scss'

const CheckoutErrorMessage = ({ message }) => (
  <div className={s.message}>{message}</div>
)

CheckoutErrorMessage.propTypes = {
  message: string
}

export default withStyles(s)(CheckoutErrorMessage)
