import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { withI18next } from 'lib/withI18next'
import withIsHidden from 'lib/withIsHidden'
import { steps } from 'reduxConstants/checkout'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import ChangeShippingAddressButton from './ChangeShippingAddressButton'

const mapDispatchToProps = (dispatch, { id }) => ({
  onClick: e => {
    e.stopPropagation()
    dispatch(CheckoutActions.setEditedShipmentAddress(id))
    dispatch(CheckoutActions.setStep(steps.shippingAddressForm))
  }
})

const handlers = {
  onClick: ({ isDisabled, onClick }) => e => !isDisabled && onClick(e)
}

export default compose(
  withI18next(['product']),
  connect(
    null,
    mapDispatchToProps
  ),
  withHandlers(handlers),
  withIsHidden
)(ChangeShippingAddressButton)
