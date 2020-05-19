import React, { memo } from 'react'

import withStyles from 'lib/withStyles'
import ShippingStep from '../Shipping/ShippingStep'
import PaymentStep from '../PaymentStep'
import ConfirmationStep from '../ConfirmationStep'

import s from './Stepper.module.scss'

const Stepper = memo(() => (
  <div className={s.stepper}>
    <div className={s.contentWrapper}>
      <ShippingStep />
      <PaymentStep />
      <ConfirmationStep />
    </div>
  </div>
))

export default withStyles(s)(Stepper)
