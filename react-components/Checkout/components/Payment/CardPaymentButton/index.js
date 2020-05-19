import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { equals } from 'ramda'
import { useTranslation } from 'react-i18next'
import { createSelector } from 'reselect'
import cn from 'classnames'

import { paymentMethods } from 'reduxConstants/checkout'
import { selectSelectedPaymentMethod } from 'selectors/stateSelectors/checkoutSelectors'
import { selectIsPayByCashOnly } from 'selectors/apiSelectors/calculationSelectors'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import { getCartItems } from 'selectors/cartSelectors'
import { isSARCurrencyCode } from 'selectors/stateSelectors/currencySelectors'
import { CalculationActions, CheckoutApiActions } from 'actions'
import { CreditCardElabelz } from 'components/Icon/constants'
import { trackCheckoutStep } from 'sagas/trackingSagasHelpers'
import withStyles from 'lib/withStyles'
import { isPayfort } from 'services/configurationCheck'
import { Visa, MasterCard, Mada } from 'components/Icons'
import CheckoutButton from '../CheckoutButton'

import s from './CardPaymentButton.module.scss'

const selectIsActive = createSelector(
  selectSelectedPaymentMethod,
  state => !equals(paymentMethods.creditCard)(state)
)

const addStyles = withStyles(s)

const CardPaymentButton = addStyles(() => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const active = useSelector(selectIsActive)
  const disabled = useSelector(selectIsPayByCashOnly)
  const cartItems = useSelector(getCartItems)
  const isSAR = useSelector(isSARCurrencyCode)

  const onClick = useCallback(
    () => {
      trackCheckoutStep(
        'payment_step_option',
        paymentMethods.creditCard,
        cartItems
      )
      dispatch(CheckoutActions.setPaymentMethod(paymentMethods.creditCard))
      dispatch(CheckoutApiActions.setError(null))
      dispatch(CalculationActions.fetch())
    },
    [cartItems]
  )

  const text = useMemo(
    () => {
      if (isSAR && isPayfort) {
        return null
      }
      return t('payByCard')
    },
    [isSAR, isPayfort]
  )

  const iconsCN = cn(s.icon, {
    [s.iconActive]: !active,
    [s.mada]: isSAR && isPayfort
  })

  const content = useMemo(
    () =>
      isSAR && isPayfort ? (
        <div className={s.threeIcons}>
          <Mada className={iconsCN} />
          <MasterCard className={iconsCN} />
          <Visa className={iconsCN} />
        </div>
      ) : (
        <CreditCardElabelz className={iconsCN} />
      ),
    [isSAR, isPayfort]
  )

  return (
    <CheckoutButton
      text={text}
      active={active}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </CheckoutButton>
  )
})

export default CardPaymentButton
