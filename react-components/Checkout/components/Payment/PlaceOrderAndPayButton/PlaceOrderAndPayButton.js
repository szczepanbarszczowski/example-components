import React, { useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  lt,
  identity,
  any,
  keys,
  pipe,
  length,
  equals,
  not,
  always
} from 'ramda'
import { formValueSelector } from 'redux-form'
import { createSelector } from 'reselect'
import Button from 'components/Buttons/Button'

import { checkoutCardValidator, checkoutCODValidator } from 'app/validators'
import {
  selectCheckoutState,
  selectSelectedPaymentMethod,
  selectIsCheckoutPageLocked,
  selectIsCheckoutPageLoading,
  isPayByPayFort,
  selectSelectedPayment
} from 'selectors/stateSelectors/checkoutSelectors'

import {
  selectCalculationShipmentMethods,
  selectCalculationProducts
} from 'selectors/apiSelectors/calculationSelectors'
import { CheckoutApiActions } from 'actions/apiActions/checkoutApiActions'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import { selectUserCreditCardProviderById } from 'selectors/userSelectors'

import {
  mapCheckoutDataForCardPayment,
  mapCheckoutDataForCOD
} from 'app/redux/services'

import { paymentMethods, payFortProvider } from 'reduxConstants/checkout'
import withStyles from 'lib/withStyles'
import { isPayfort } from 'services/configurationCheck'
import { discountCode as form } from 'constants/formNames'
import s from './PlaceOrderAndPayButton.module.scss'

export const hasCheckoutErrorsSelector = createSelector(
  selectCalculationProducts,
  selectCalculationShipmentMethods,
  selectCheckoutState,
  selectSelectedPaymentMethod,
  (products, deliveryOptions, checkout, paymentMethod) =>
    pipe(
      paymentMethod === paymentMethods.creditCard
        ? mapCheckoutDataForCardPayment(products, deliveryOptions)
        : mapCheckoutDataForCOD(products, deliveryOptions),
      paymentMethod === paymentMethods.creditCard
        ? isPayfort
          ? always
          : checkoutCardValidator
        : checkoutCODValidator,
      keys,
      length,
      lt(0)
    )(checkout)
)

const selectIsPayByPayPal = createSelector(
  selectSelectedPaymentMethod,
  equals(paymentMethods.payPal)
)

const formSelector = formValueSelector(form)

const isActiveSelector = createSelector(
  hasCheckoutErrorsSelector,
  selectIsCheckoutPageLocked,
  selectIsCheckoutPageLoading,
  state => !!formSelector(state, 'code'),
  (...args) =>
    pipe(
      any(identity),
      not
    )(args)
)

const PlaceOrderAndPayButton = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const paymentId = useSelector(selectSelectedPayment)
  const paymentMethod = useSelector(selectSelectedPaymentMethod)
  const selectUserCreditCardProviderByIdSelector = selectUserCreditCardProviderById()
  const provider = useSelector(state =>
    selectUserCreditCardProviderByIdSelector(state, paymentId)
  )
  const isLoading = useSelector(selectIsCheckoutPageLoading)
  const isHidden = useSelector(selectIsPayByPayPal)
  const payByPayFort = useSelector(isPayByPayFort)
  const isActive = useSelector(isActiveSelector)

  const buttonProps = useMemo(
    () => ({
      active: isActive,
      text: isLoading ? t('processing') : t('place_order_and_pay'),
      buttonStyleType: 'primary-dark',
      style: { [s.placeOrderAndPayButton]: true },
      isLoading
    }),
    [isLoading, isActive]
  )

  const onClick = useCallback(
    () => {
      if (payByPayFort && isPayfort) {
        dispatch(CheckoutActions.setIsAddingPaymentCard(true))
      } else if (
        provider === payFortProvider &&
        paymentMethod === paymentMethods.creditCard
      ) {
        dispatch(CheckoutActions.setShowAddCvv(true))
      } else {
        dispatch(CheckoutApiActions.save())
      }
    },
    [payByPayFort, provider, paymentMethod]
  )

  if (isHidden) return null

  return <Button onClick={onClick} {...buttonProps} />
}

export default withStyles(s)(PlaceOrderAndPayButton)
