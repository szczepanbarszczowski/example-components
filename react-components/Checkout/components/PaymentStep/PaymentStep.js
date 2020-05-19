import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { createSelector } from 'reselect'
import { includes, identical, not, isNil } from 'ramda'

import { steps } from 'app/redux/constants/checkout'
import {
  selectSelectedShipmentAddress,
  selectIsCheckoutPageLocked,
  selectIsCheckoutFinished,
  selectCurrentStep
} from 'selectors/stateSelectors/checkoutSelectors'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import Step from 'components/Step'

const canEnterStepSelector = createSelector(
  selectSelectedShipmentAddress,
  selectIsCheckoutPageLocked,
  selectIsCheckoutFinished,
  (hasShipmentAddress, isPageLocked, isCheckoutFinished) =>
    not(isNil(hasShipmentAddress)) &&
    not(isPageLocked) &&
    not(isCheckoutFinished)
)

const isPaymentStep = identical(steps.payment)

const PaymentStep = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const canEnterStep = useSelector(canEnterStepSelector)
  const isActive = useSelector(state => isPaymentStep(selectCurrentStep(state)))
  const isDone = useSelector(state =>
    includes(selectCurrentStep(state), [steps.confirmation])
  )

  const onClick = useCallback(
    () => {
      canEnterStep && dispatch(CheckoutActions.setStep(steps.payment))
    },
    [canEnterStep]
  )

  const paymentProps = useMemo(
    () => ({
      no: 2,
      label: t('payment'),
      hasNext: true,
      isActive,
      isDone
    }),
    [isActive, isDone]
  )

  return <Step {...paymentProps} onClick={onClick} />
}

export default PaymentStep
