import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import userCreators from 'actions/userActions'

import { mapIndexed } from 'services/commonHelpers'
import { CreditCardsShape } from 'app/shapes'
import withStyles from 'lib/withStyles'
import { isPayfort } from 'services/configurationCheck'
import CreditCardListItem from '../CreditCardListItem'

import s from './CreditCardList.module.scss'

const CreditCardList = ({ creditCards }) => {
  const dispatch = useDispatch()

  useEffect(
    () => () => {
      if (!isPayfort) {
        dispatch(userCreators.getUser())
        dispatch(CheckoutActions.setIsAddingPaymentCard(false))
      }
    },
    []
  )

  return (
    <div className={s.wrapper}>
      {mapIndexed(
        (card, index) => (
          <CreditCardListItem key={card.id} cardIndex={index} card={card} />
        ),
        creditCards
      )}
    </div>
  )
}

CreditCardList.propTypes = {
  creditCards: CreditCardsShape
}

CreditCardList.defaultProps = {
  creditCards: []
}

export default withStyles(s)(CreditCardList)
