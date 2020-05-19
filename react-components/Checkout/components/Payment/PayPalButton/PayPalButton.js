import React, { useCallback } from 'react'
import { equals } from 'ramda'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'
import { createSelector } from 'reselect'

import { selectIsPayByCashOnly } from 'selectors/apiSelectors/calculationSelectors'
import { selectSelectedPaymentMethod } from 'selectors/stateSelectors/checkoutSelectors'
import { paymentMethods } from 'reduxConstants/checkout'
import { PayPalElabelz } from 'components/Icon/constants'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import { CalculationActions, CheckoutApiActions } from 'actions'
import { trackCheckoutStep } from 'sagas/trackingSagasHelpers'
import { getCartItems } from 'selectors/cartSelectors'

import withStyles from 'lib/withStyles'
import CheckoutButton from '../CheckoutButton'

import s from './PayPalButton.module.scss'

const selectIsActive = createSelector(
  selectSelectedPaymentMethod,
  state => !equals(paymentMethods.payPal)(state)
)

const PayPalButton = () => {
  const dispatch = useDispatch()
  const isActive = useSelector(selectIsActive)
  const isDisabled = useSelector(selectIsPayByCashOnly)
  const cartItems = useSelector(getCartItems)

  const onClick = useCallback(() => {
    trackCheckoutStep('payment_step_option', paymentMethods.payPal, cartItems)
    dispatch([
      CheckoutActions.setPaymentMethod(paymentMethods.payPal),
      CheckoutApiActions.setError(null)
    ])
    dispatch(CalculationActions.fetch())
  }, [])

  const { t } = useTranslation('common')

  return (
    <CheckoutButton
      onClick={onClick}
      active={isActive}
      disabled={isDisabled}
      text={t('pay_by_paypal')}
    >
      <PayPalElabelz
        className={cn(s.icon, {
          [s.iconActive]: !isActive,
          [s.disabled]: isDisabled
        })}
      />
    </CheckoutButton>
  )
}

export default withStyles(s)(PayPalButton)
