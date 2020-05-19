import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { string } from 'prop-types'

import { isCartEmpty } from 'selectors/cartSelectors'
import { selectIsCheckoutFinished } from 'selectors/stateSelectors/checkoutSelectors'
import withStyles from 'lib/withStyles'

import CartEmpty from 'components/Cart/CartEmpty'
import MainLayout from 'layouts/MainLayout'
import { steps } from 'reduxConstants/checkout'
import CheckoutScripts from 'components/CheckoutScripts'
import { CHECKOUT } from 'constants/pageNames'
import ShippingSection from '../../components/Shipping/ShippingSection'
import PaymentSection from '../../components/Payment/PaymentSection'
import ConfirmationSection from '../../components/Confirmation/ConfirmationSection'
import CreateShippingAddressForm from '../../components/Shipping/CreateShippingAddressForm'
import CreateCreditCard from '../../components/Payment/CreateCreditCard'
import Stepper from '../../components/Stepper'
import s from './Checkout.module.scss'

const checkoutSteps = {
  [steps.shipping]: <ShippingSection key={steps.shipping} />,
  [steps.shippingAddressForm]: (
    <CreateShippingAddressForm key={steps.shippingAddressForm} />
  ),
  [steps.payment]: <PaymentSection key={steps.payment} />,
  [steps.confirmation]: <ConfirmationSection key={steps.confirmation} />
}

const Checkout = memo(({ t, currentStep }) => {
  const showCartEmpty = useSelector(
    state => isCartEmpty(state) && !selectIsCheckoutFinished(state)
  )

  if (!steps.confirmation && showCartEmpty) return <CartEmpty />

  return (
    <MainLayout pageName={CHECKOUT} headerTitle={t('product:safe_checkout')}>
      <CheckoutScripts />
      <Stepper />
      <div className={s.wrapper}>
        <div className={s.content}>{checkoutSteps[currentStep]}</div>
        <CreateCreditCard />
      </div>
    </MainLayout>
  )
})

Checkout.propTypes = {
  currentStep: string.isRequired
}

export default withStyles(s)(Checkout)
