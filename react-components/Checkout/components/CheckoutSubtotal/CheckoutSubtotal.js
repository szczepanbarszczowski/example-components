import React from 'react'
import { string, func, number } from 'prop-types'
import withStyles from 'lib/withStyles'
import s from './CheckoutSubtotal.scss'

const CheckoutSubtotal = ({ label, value, currency, t }) => (
  <div className={s.block}>
    <h4 className={s.title}>
      <span className={s.text}>{label}</span>
    </h4>
    <span className={s.amount}>
      {t('currency', { data: { value, currency } })}
    </span>
  </div>
)

CheckoutSubtotal.propTypes = {
  label: string.isRequired,
  currency: string,
  value: number,
  t: func.isRequired
}

export default withStyles(s)(CheckoutSubtotal)
