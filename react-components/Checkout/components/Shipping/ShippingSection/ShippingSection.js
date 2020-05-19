import React from 'react'
import { func } from 'prop-types'
import withStyles from 'lib/withStyles'
import ContinueToPaymentButton from '../ContinueToPaymentButton'
import ShippingAddressList from '../ShippingAddressList'

import s from './ShippingSection.module.scss'

const ShippingSection = ({ t }) => (
  <section className={s.section}>
    <h4 className={s.sectionHeading}>{t('shipping_address')}</h4>
    <ShippingAddressList />
    <div className={s.options}>
      <ContinueToPaymentButton style={s.button} />
    </div>
    {/*
        @todo: remove or replace below section
        basing on the decision on shipping options

        <h4 className={s.sectionHeading}>{t('shipping_options')}</h4>
        <ShipmentOptions />
    */}
  </section>
)

ShippingSection.propTypes = {
  t: func.isRequired
}

export default withStyles(s)(ShippingSection)
