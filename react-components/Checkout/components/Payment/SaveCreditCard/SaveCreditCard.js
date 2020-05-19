import React, { useCallback, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import {
  isPayByPayFort,
  selectIsSavedCreditCard
} from 'selectors/stateSelectors/checkoutSelectors'

import withStyles from 'lib/withStyles'
import CreditCardListItemCheck from '../CreditCardListItemCheck'
import s from './SaveCreditCard.module.scss'

const SaveCreditCard = memo(() => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isChecked = useSelector(selectIsSavedCreditCard)
  const handleClick = useCallback(
    () => dispatch(CheckoutActions.saveCreditCard(!isChecked)),
    [isChecked]
  )

  const isHidden = !useSelector(isPayByPayFort)

  if (isHidden) return null

  return (
    <div className={s.wrapper} onClick={handleClick}>
      <CreditCardListItemCheck checked={isChecked} />
      <div className={s.details}>{t('save_credit_card')}</div>
    </div>
  )
})

export default withStyles(s)(SaveCreditCard)
