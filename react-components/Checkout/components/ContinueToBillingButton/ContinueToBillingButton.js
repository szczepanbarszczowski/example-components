import React from 'react'
import Button from 'components/Buttons/Button'

import withStyles from 'lib/withStyles'

import s from './ContinueToBillingButton.module.scss'

const ContinueToBillingButton = ({ ...props }) => (
  <div className={s.continue}>
    <Button {...props} textStyle={s.buttonText} />
  </div>
)

export default withStyles(s)(ContinueToBillingButton)
