import React from 'react'
import { string } from 'prop-types'
import withStyles from 'lib/withStyles'
import s from './CheckoutDiscountInfo.scss'

const CheckoutDiscountInfo = ({ label, discountValue }) => (
  <div className={s.block}>
    <h4 className={s.title}>
      <span className={s.text}>{label}</span>
    </h4>

    {discountValue}
  </div>
)

CheckoutDiscountInfo.propTypes = {
  label: string,
  discountValue: string
}

export default withStyles(s)(CheckoutDiscountInfo)
