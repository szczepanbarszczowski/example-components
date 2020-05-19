import { connect } from 'react-redux'
import { compose } from 'recompose'
import { AddressBookActions, CheckoutActions } from 'actions'
import { trackCheckoutStep } from 'sagas/trackingSagasHelpers'
import RemoveShippingAddressButton from './RemoveShippingAddressButton'

const mapDispatchToProps = (dispatch, { id, checked }) => ({
  onClick: e => {
    e.stopPropagation()

    if (checked) {
      dispatch(CheckoutActions.setShipmentAddress(null))
      trackCheckoutStep('shipping_step_option', 'Existing Address')
    }
    dispatch(AddressBookActions.removeAddress(id))
  }
})

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(RemoveShippingAddressButton)
