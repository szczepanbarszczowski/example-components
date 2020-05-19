import React from 'react'
import { not, pipe, equals } from 'ramda'
import { useTranslation, Trans } from 'react-i18next'
import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

import { selectSelectedPaymentMethod } from 'selectors/stateSelectors/checkoutSelectors'
import { paymentMethods } from 'reduxConstants/checkout'

import withStyles from 'lib/withStyles'

import s from './PayPalSection.module.scss'

const selectIsHidden = createSelector(
  selectSelectedPaymentMethod,
  pipe(
    equals(paymentMethods.payPal),
    not
  )
)

const PayPalSection = () => {
  const isHidden = useSelector(selectIsHidden)

  const { t } = useTranslation('product')

  return isHidden ? null : (
    <p className={s.paragraph}>
      <Trans t={t} i18nKey="paypal_description">
        You will be <strong>redirected to the PayPal page</strong> to complete
        the payment process.
      </Trans>
      <br />
      <Trans t={t} i18nKey="paypal_description_extra">
        PayPal will charge you in <strong>USD</strong>. Total may differ
        slightly due to currency conversion.
      </Trans>
    </p>
  )
}

export default withStyles(s)(PayPalSection)
