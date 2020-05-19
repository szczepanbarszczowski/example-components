import React, { Fragment } from 'react'
import { bool } from 'prop-types'
import { not } from 'ramda'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import { isMobile as isMobileSelector } from 'selectors/browserSelectors'
import { selectPaymentMethodIsCreditCard } from 'selectors/stateSelectors/checkoutSelectors'
import withStyles from 'lib/withStyles'

import CreditCardList from '../../CreditCardList'
import CreditCardSlider from '../../CreditCardSlider'
import AddCreditCardButton from '../../AddCreditCardButton'
import s from './CreditCardSection.module.scss'

const selectIsHidden = createSelector(selectPaymentMethodIsCreditCard, not)

const CreditCardSection = () => {
  const isMobile = useSelector(isMobileSelector)
  const isHidden = useSelector(selectIsHidden)
  if (isHidden) return null
  return (
    <Fragment>
      {isMobile ? <CreditCardSlider /> : <CreditCardList />}
      <div className={s.createCreditCardFrom} />
      <AddCreditCardButton />
    </Fragment>
  )
}

CreditCardSection.propTypes = {
  isMobile: bool
}

export default withStyles(s)(CreditCardSection)
