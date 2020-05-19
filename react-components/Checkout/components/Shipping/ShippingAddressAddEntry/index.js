import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withI18next } from 'lib/withI18next'
import { CheckoutActions } from 'actions'
import { steps } from 'reduxConstants/checkout'
import ShippingAddressAddEntry from './ShippingAddressAddEntry'

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(CheckoutActions.setEditedShipmentAddress(null))
    dispatch(CheckoutActions.setStep(steps.shippingAddressForm))
  }
})

export default compose(
  withI18next(),
  connect(
    null,
    mapDispatchToProps
  )
)(ShippingAddressAddEntry)
