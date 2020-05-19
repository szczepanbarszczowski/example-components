import React, { useEffect, useCallback, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import {
  selectOrderDataRedirectUrl,
  // selectOrderDataId,
  selectIsAddingPaymentCard
} from 'selectors/stateSelectors/checkoutSelectors'
import { CheckoutApiActions } from 'actions/apiActions/checkoutApiActions'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import ModalCentered from 'components/Modals/ModalCentered'
import { Close } from 'components/Icon/constants'
import withStyles from 'lib/withStyles'
import CreditCardForm from '../CreditCardForm'
import s from './CreditCardFormPopup.module.scss'

const CreditCardFormPopup = memo(() => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const redirectUrl = useSelector(selectOrderDataRedirectUrl)
  // TODO: Remove if implementation works on staging
  // const orderId = useSelector(selectOrderDataId)

  const isAddingPaymentCard = useSelector(selectIsAddingPaymentCard)

  const close = useCallback(() => {
    dispatch(CheckoutActions.setIsAddingPaymentCard(false))
    // TODO: Remove if implementation works on staging
    // dispatch(CheckoutApiActions.orderSuccess(orderId))
    // dispatch([
    //   CheckoutActions.setIsAddingPaymentCard(false),
    //   CheckoutActions.setOrderId(null),
    //   CheckoutActions.setOrderData(null)
    // ])
  }, [])

  const onClose = useCallback(() => {
    dispatch(CheckoutActions.setIsAddingPaymentCard(false))
    // TODO: Remove if implementation works on staging
    // dispatch(CheckoutApiActions.orderSuccess(orderId))
    // dispatch(CheckoutActions.clearOrder())
  }, [])

  useEffect(
    () => {
      if (!redirectUrl && isAddingPaymentCard) {
        dispatch(CheckoutApiActions.createOrder())
      }
    },
    [redirectUrl, isAddingPaymentCard]
  )

  if (!isAddingPaymentCard) return null

  return (
    <ModalCentered onClose={onClose}>
      <div className={s.formWrapper}>
        <div className={s.headingWrapper}>
          <div className={s.modalTitle}>
            {t('pay_with_another_credit_card')}
          </div>
          <Close onClick={close} className={s.close} />
        </div>
        <CreditCardForm />
      </div>
    </ModalCentered>
  )
})

export default withStyles(s)(CreditCardFormPopup)
