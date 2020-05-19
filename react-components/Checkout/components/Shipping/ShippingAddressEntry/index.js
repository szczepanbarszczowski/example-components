import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { identical } from 'ramda'
import { createSelector } from 'reselect'
import { selectSelectedShipmentAddress } from 'selectors/stateSelectors/checkoutSelectors'
import { getCartItems } from 'selectors/cartSelectors'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import { trackCheckoutStep } from 'sagas/trackingSagasHelpers'
import ShippingAddressEntry from './ShippingAddressEntry'

const isCheckedSelector = createSelector(
  selectSelectedShipmentAddress,
  (state, payload) => payload,
  identical
)

const mapStateToProps = (state, { details: { id } }) => ({
  checked: isCheckedSelector(state, id),
  cartItems: getCartItems(state)
})

const mapDispatchToProps = (dispatch, { details: { id } }) => ({
  setShipmentAddress: () => dispatch(CheckoutActions.setShipmentAddress(id))
})

const handlers = {
  onClick: ({ disabled, checked, setShipmentAddress, cartItems }) => () => {
    !disabled && !checked && setShipmentAddress()
    trackCheckoutStep('shipping_step_option', 'Existing Address', cartItems)
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers(handlers)
)(ShippingAddressEntry)
