import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { isMobile as isMobileSelector } from 'selectors/browserSelectors'
import { selectSelectedPaymentMethod } from 'selectors/stateSelectors/checkoutSelectors'
import { getCartItems } from 'selectors/cartSelectors'
import { trackCheckoutStep } from 'sagas/trackingSagasHelpers'

import OrderSummary from 'components/OrderSummary'
import withStyles from 'lib/withStyles'
import CreditCardSection from '../CreditCardSection'
import CashOnDeliverySection from '../CashOnDeliverySection'
import PayPalSection from '../PayPalSection'
import PaymentMethodsSection from '../PaymentMethodsSection'
import CreditSection from '../CreditSection'
import PlaceOrderAndPayButton from '../PlaceOrderAndPayButton'
import CheckoutErrorMessage from '../CheckoutErrorMessage'
import YourOrder from '../YourOrder'
import PayPalCheckoutButton from '../PayPalCheckoutButton'

import s from '../../../shared.scss'

const PaymentSection = () => {
  const { t } = useTranslation()
  const isMobile = useSelector(isMobileSelector)
  const paymentMethod = useSelector(selectSelectedPaymentMethod)
  const cartItems = useSelector(getCartItems)

  useEffect(() => {
    trackCheckoutStep('payment_step_option', paymentMethod, cartItems)
  }, [])

  return (
    <section className={s.section}>
      <div className={s.content}>
        <div>
          <h4 className={s.sectionHeading}>{t('payment')}</h4>
          <PaymentMethodsSection />
          <CreditCardSection />
          <CashOnDeliverySection />
          <PayPalSection />
          <CreditSection />
          {!isMobile && (
            <>
              <PlaceOrderAndPayButton />
              <PayPalCheckoutButton />
              <CheckoutErrorMessage />
            </>
          )}
          <YourOrder />
        </div>
        <div>
          <OrderSummary isCheckout />
          {isMobile && (
            <>
              <PlaceOrderAndPayButton />
              <PayPalCheckoutButton />
              <CheckoutErrorMessage />
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default withStyles(s)(PaymentSection)
