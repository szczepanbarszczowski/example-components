import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'ramda'
import { createSelector } from 'reselect'

import withStyles from 'lib/withStyles'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import { Creators } from 'actions/formActions'
import userCreators from 'actions/userActions'
import { selectUserCreditCards } from 'selectors/userSelectors'
import { selectIsAddingPaymentCard } from 'selectors/stateSelectors/checkoutSelectors'
import CreditCardForm from '../CreditCardForm'
import s from './CreateCreditCard.module.scss'

const getIsHiddenSelector = createSelector(
  selectIsAddingPaymentCard,
  selectUserCreditCards,
  (value, creditCards) => !value && !isEmpty(creditCards)
)

const callbacks = [
  () => CheckoutActions.setIsAddingPaymentCard(false),
  userCreators.getUserSuccess,
  (_data, id) => CheckoutActions.setPayment(id)
]

const CreateCreditCard = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const onSubmit = useCallback(
    data => Creators.submitCreditCardForm({ data, callbacks })(dispatch),
    []
  )
  const onCancel = useCallback(
    () => dispatch(CheckoutActions.setIsAddingPaymentCard(false)),
    []
  )
  const isHidden = useSelector(getIsHiddenSelector)

  return (
    <div
      id="creditCardForm"
      className={{
        [s.hideForm]: isHidden
      }}
    >
      <h5 className={s.sectionSubHeading}>{t('new_card')}</h5>
      <CreditCardForm onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  )
}

export default withStyles(s)(CreateCreditCard)
