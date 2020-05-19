import React, { useCallback, useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'

import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import { CheckoutApiActions } from 'actions'
import {
  selectSelectedPayment,
  isPayByPayFort
} from 'selectors/stateSelectors/checkoutSelectors'
import { payfort } from 'reduxConstants/checkout'

import withStyles from 'lib/withStyles'
import CreditCardListItemCheck from '../CreditCardListItemCheck'
import s from './AddAnotherCreditCard.module.scss'

const AddAnotherCreditCard = memo(() => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const handleClick = useCallback(() => {
    dispatch([
      CheckoutActions.setPayment(payfort),
      CheckoutApiActions.setError(null)
    ])
  }, [])

  const selectedPayment = useSelector(selectSelectedPayment)
  const isChecked = useSelector(isPayByPayFort)

  useEffect(() => {
    if (!selectedPayment) {
      dispatch(CheckoutActions.setPayment(payfort))
    }
  }, [])

  return (
    <div
      className={cn(s.wrapper, {
        [s.checked]: isChecked
      })}
      onClick={handleClick}
    >
      <CreditCardListItemCheck checked={isChecked} />
      <div className={s.details}>
        <span className={s.boldText}>{t('pay_with_another_credit_card')}</span>
      </div>
    </div>
  )
})

export default withStyles(s)(AddAnotherCreditCard)
