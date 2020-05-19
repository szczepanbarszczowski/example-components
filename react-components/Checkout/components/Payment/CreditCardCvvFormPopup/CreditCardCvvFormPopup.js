import React, { useCallback, memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import {
  selectIsShowingCvvPop,
  selectSelectedPayment
} from 'selectors/stateSelectors/checkoutSelectors'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import { CheckoutApiActions } from 'actions/apiActions/checkoutApiActions'
import { selectUserCreditCardLastFourNumbersById } from 'selectors/userSelectors'

import { Input } from 'components/Fields/Input'
import ModalCentered from 'components/Modals/ModalCentered'
import withStyles from 'lib/withStyles'
import Button from 'components/Buttons/Button'
import CreditCardListItemCheck from '../CreditCardListItemCheck'
import s from './CreditCardCvvFormPopup.module.scss'

const validateCvv = value => /^[0-9]{3,4}$/.test(value)

const CreditCardCvvFormPopup = memo(() => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [securityCode, setSecurityCode] = useState(null)
  const [isValidCvv, setIsValidCvv] = useState(false)

  const paymentId = useSelector(selectSelectedPayment)
  const selectUserCreditCardLastFourNumbersByIdSelector = selectUserCreditCardLastFourNumbersById()
  const lastFourCreditCardNumber = useSelector(state =>
    selectUserCreditCardLastFourNumbersByIdSelector(state, paymentId)
  )
  const isShowingCvvPopup = useSelector(selectIsShowingCvvPop)

  const close = useCallback(() => {
    dispatch(CheckoutActions.setShowAddCvv(false))
  }, [])

  const onChange = useCallback(e => {
    const value = e.target.value
    const isValid = validateCvv(value)
    setSecurityCode(value)
    setIsValidCvv(isValid)
  }, [])

  const pay = useCallback(
    () => {
      dispatch(
        CheckoutApiActions.save({
          securityCode,
          checkoutUsingSavedCard: true
        })
      )
      dispatch(CheckoutActions.setShowAddCvv(false))
    },
    [securityCode]
  )

  if (!isShowingCvvPopup) return null

  return (
    <ModalCentered>
      <div className={s.modalWrapper}>
        <div className={s.headingWrapper}>
          <div className={s.modalTitle}>{t('cvv_header')}</div>
        </div>
        <div className={s.modalContent}>
          <div className={s.modalDescription}>{t('cvv_content')}</div>
          <div className={s.subHeader}>{t('your_credit_card')}</div>
          <div className={s.cardWrapper}>
            <CreditCardListItemCheck checked={true} />
            <div className={s.details}>
              <span className={s.boldText}>
                xxxx xxxx xxxx {lastFourCreditCardNumber}
              </span>
            </div>
          </div>
          <div className={s.subHeader}>{t('cvv_code')}</div>
          <Input
            maxLength="4"
            name="cvv_code"
            placeholder="0000"
            pattern="/^[0-9]{3,4}$/"
            style={s.cvvCode}
            type="text"
            onChange={onChange}
          />
        </div>
        <div className={s.buttonsWrapper}>
          <Button
            onClick={close}
            buttonStyleType="white-gray"
            style={s.backButton}
          >
            {t('cancel')}
          </Button>

          <Button
            active={isValidCvv}
            onClick={pay}
            buttonStyleType="primary"
            style={s.payButton}
          >
            {t('place_order')}
          </Button>
        </div>
      </div>
    </ModalCentered>
  )
})

export default withStyles(s)(CreditCardCvvFormPopup)
