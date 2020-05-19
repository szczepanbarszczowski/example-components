import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { not } from 'ramda'
import { createSelector } from 'reselect'

import { isMobile as isMobileSelector } from 'selectors/browserSelectors'
import { selectPaymentMethodIsCreditCard } from 'selectors/stateSelectors/checkoutSelectors'

import withStyles from 'lib/withStyles'

import CreditCardList from '../../CreditCardList'
import CreditCardSlider from '../../CreditCardSlider'
import CreditCardFormPopup from '../../CreditCardFormPopup'
import CreditCardCvvFormPopup from '../../CreditCardCvvFormPopup'
import AddAnotherCreditCard from '../../AddAnotherCreditCard'
import SaveCreditCard from '../../SaveCreditCard'
import s from './CreditCardSection.module.scss'

const selectIsHidden = createSelector(selectPaymentMethodIsCreditCard, not)

const CreditCardSection = memo(() => {
  const { t } = useTranslation()
  const isHidden = useSelector(selectIsHidden)
  const isMobile = useSelector(isMobileSelector)

  if (isHidden) return null
  return (
    <>
      {isMobile ? <CreditCardSlider /> : <CreditCardList />}
      <CreditCardFormPopup />
      <CreditCardCvvFormPopup />
      <AddAnotherCreditCard />
      <SaveCreditCard />
      <p className={s.paragraph}>{t('payfort_text')}</p>
    </>
  )
})

export default withStyles(s)(CreditCardSection)
