import { connect } from 'react-redux'
import { lifecycle, compose } from 'recompose'
import { createSelector, createStructuredSelector } from 'reselect'
import { setStatic } from 'recompose'
import { isEmpty } from 'ramda'
import { steps } from 'app/redux/constants/checkout'
import { initiateCheckout as pixelInitiateCheckout } from 'services/fbPixel'

import {
  CheckoutActions,
  CalculationActions,
  CheckoutApiActions,
  CartActions
} from 'actions'

import {
  selectPrimaryAddress,
  selectDefaultCreditCard,
  hasUserAddresses,
  selectFirstAddress
} from 'selectors/userSelectors'
import {
  selectCalculationProducts,
  selectTotalCost,
  selectCalculationCurrencyCode
} from 'selectors/apiSelectors/calculationSelectors'
import { trackCheckoutStep } from 'sagas/trackingSagasHelpers'
import {
  selectSelectedShipmentAddress,
  selectSelectedPayment,
  selectSelectedBillingAddress,
  selectCartWasCleared,
  selectCurrentStep
} from 'selectors/stateSelectors/checkoutSelectors'
import { getCartItems } from 'selectors/cartSelectors'
import { redirect, withI18next, withPageTracking } from 'lib'
import { getTotalCartItemCount } from 'services/cart'
import { CHECKOUT } from 'constants/pageNames'
import Checkout from './Checkout'

const selectProductsCount = createSelector(
  selectCalculationProducts,
  products => getTotalCartItemCount(products)
)

const selectProductNumbers = createSelector(
  selectCalculationProducts,
  products => products.map(({ productNumber }) => productNumber)
)

const mapStateToProps = createStructuredSelector({
  selectedShipmentAddress: selectSelectedShipmentAddress,
  selectedPayment: selectSelectedPayment,
  selectedBillingAddress: selectSelectedBillingAddress,
  primaryAddress: selectPrimaryAddress,
  defaultCreditCard: selectDefaultCreditCard,
  cartWasCleared: selectCartWasCleared,
  currency: selectCalculationCurrencyCode,
  totalCost: selectTotalCost,
  productsCount: selectProductsCount,
  productNumbers: selectProductNumbers,
  currentStep: selectCurrentStep,
  hasUserAddresses: hasUserAddresses,
  cartItems: getCartItems
})

const mapDispatchToProps = {
  setBillingAddress: CheckoutActions.setBillingAddress,
  setShipmentAddress: CheckoutActions.setShipmentAddress,
  setPayment: CheckoutActions.setPayment,
  setCheckoutStep: CheckoutActions.setStep,
  setCheckoutError: CheckoutApiActions.setError,
  setOrderId: CheckoutActions.setOrderId,
  setOrderNumber: CheckoutActions.setOrderNumber,
  clearCart: CartActions.clear,
  clearDiscountCode: CheckoutActions.resetDiscountCode,
  clearCalculations: CalculationActions.clear,
  setCartWasCleared: CheckoutActions.setCartWasCleared
}

const initCheckoutState = context => {
  const store = context.store
  const state = store.getState()
  const products = selectCalculationProducts(state)
  const hasNoProducts = !products || isEmpty(products)

  // if (hasNoProducts) {
  //   redirect(context, '/my-bag')
  //   return {}
  // }

  const primaryAddress = selectPrimaryAddress(state)
  const firstAddress = selectFirstAddress(state)

  if (!selectSelectedShipmentAddress(state)) {
    if (primaryAddress) {
      store.dispatch(CheckoutActions.setShipmentAddress(primaryAddress))
    } else if (firstAddress) {
      store.dispatch(CheckoutActions.setShipmentAddress(firstAddress))
    }
  }

  const defaultCreditCard = selectDefaultCreditCard(state)
  if (!selectSelectedPayment(state) && defaultCreditCard) {
    store.dispatch(CheckoutActions.setPayment(defaultCreditCard))
  }

  if (!selectSelectedBillingAddress(state) && primaryAddress) {
    store.dispatch(CheckoutActions.setBillingAddress(primaryAddress))
  }

  return {}
}

const componentDidMount = function() {
  const {
    setCheckoutError,
    setOrderId,
    setOrderNumber,
    setCheckoutStep,
    currency,
    totalCost,
    productsCount,
    productNumbers,
    hasUserAddresses,
    cartItems
  } = this.props

  if (hasUserAddresses) {
    setCheckoutStep(steps.shipping)
    trackCheckoutStep('shipping_step_option', 'Existing Address', cartItems)
  } else {
    setCheckoutStep(steps.shippingAddressForm)
  }

  setCheckoutError(null)
  setOrderNumber(null)
  setOrderId(null)

  pixelInitiateCheckout({
    content_category: 'Checkout page',
    content_ids: productNumbers,
    content_type: 'product',
    currency,
    num_items: productsCount,
    value: totalCost
  })
}

function componentWillUnmount() {
  const props = this.props

  if (props.cartWasCleared) {
    props.setCartWasCleared(false)
    props.clearCart()
    props.clearCalculations()
    props.clearDiscountCode()
  }
}

export default compose(
  withI18next(['common', 'product']),
  withPageTracking(CHECKOUT),
  setStatic('getInitialProps', initCheckoutState),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount,
    componentWillUnmount
  })
)(Checkout)
