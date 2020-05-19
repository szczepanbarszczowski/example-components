import React from 'react'
import { useTranslation } from 'react-i18next'
import withStyles from 'lib/withStyles'
import CardPaymentButton from '../CardPaymentButton'
import CashOnDeliveryButton from '../CashOnDeliveryButton'
import StoreCreditsButton from '../StoreCreditsButton'
import PayPalButton from '../PayPalButton'
import s from './PaymentMethodsSection.module.scss'

const PaymentMethodsSection = () => {
  const { t } = useTranslation()

  return (
    <>
      <h5 className={s.sectionSubHeading}>{t('payment_methods')}</h5>
      <div className={s.paymentMethodsWrapper}>
        <CardPaymentButton />
        <CashOnDeliveryButton />
        <PayPalButton />
        <StoreCreditsButton />
      </div>
    </>
  )
}

export default withStyles(s)(PaymentMethodsSection)
