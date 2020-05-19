import React from 'react'
import { string } from 'prop-types'

import withStyles from 'lib/withStyles'

import s from './CashOnDeliverySection.module.scss'

const CashOnDeliverySection = ({ label }) => (
  <p className={s.paragraph}>{label}</p>
)

CashOnDeliverySection.propTypes = {
  label: string
}

export default withStyles(s)(CashOnDeliverySection)
