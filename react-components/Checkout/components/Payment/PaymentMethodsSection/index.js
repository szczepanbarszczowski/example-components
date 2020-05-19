import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { selectPaymentMethodIsStoreCredits } from 'selectors/stateSelectors/checkoutSelectors'
import { selectIsPayByCashOnly } from 'selectors/apiSelectors/calculationSelectors'
import { getCartItems } from 'selectors/cartSelectors'
import { trackCheckoutStep } from 'sagas/trackingSagasHelpers'
import { paymentMethods } from 'reduxConstants/checkout'
import { CheckoutApiActions, CalculationActions } from 'actions'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import PaymentMethodsSection from './PaymentMethodsSection'

const mapStateToProps = state => ({
  isPayByStoreCreditsOnly: selectIsPayByCashOnly(state),
  isSelectedStoreCreditOnly: selectPaymentMethodIsStoreCredits(state),
  cartItems: getCartItems(state)
})

function componentDidMount() {
  const {
    isPayByStoreCreditsOnly,
    isSelectedStoreCreditOnly,
    dispatch,
    cartItems
  } = this.props

  if (isPayByStoreCreditsOnly && !isSelectedStoreCreditOnly) {
    trackCheckoutStep(
      'payment_step_option',
      paymentMethods.storeCredits,
      cartItems
    )
    dispatch([
      CheckoutActions.setPaymentMethod(paymentMethods.storeCredits),
      CheckoutApiActions.setError(null)
    ])
    dispatch(CalculationActions.fetch())
  }
}

export default compose(
  connect(mapStateToProps),
  lifecycle({ componentDidMount })
)(PaymentMethodsSection)
