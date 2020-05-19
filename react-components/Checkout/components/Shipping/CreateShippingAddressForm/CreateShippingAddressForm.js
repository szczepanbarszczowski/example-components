import { connect } from 'react-redux'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import { selectUserAddressById } from 'selectors/userSelectors'
import { selectEditedShipmentAddress } from 'selectors/stateSelectors/checkoutSelectors'
import { getCountryId } from 'selectors/stateSelectors/translationSelectors'
import { selectCountries } from 'selectors/apiSelectors/countrySelectors'
import { Creators } from 'actions/formActions'
import userCreators from 'actions/userActions'
import { steps } from 'reduxConstants/checkout'

import AddressForm from '../AddressForm'

const getInitialValues = state => ({
  primary: false,
  billing: false,
  country: getCountryId(state),
  countries: selectCountries(state)
})

const mapStateToProps = state => {
  const id = selectEditedShipmentAddress(state)
  const selectUserAddressByIdSelector = selectUserAddressById()
  return {
    initialValues: id
      ? selectUserAddressByIdSelector(state, id)
      : getInitialValues(state)
  }
}

const callbacks = [
  () => CheckoutActions.setEditedShipmentAddress(null),
  userCreators.getUserSuccess,
  (_data, id) => CheckoutActions.setShipmentAddress(id),
  () => CheckoutActions.setStep(steps.shipping)
]

const mapDispatchToProps = dispatch => ({
  onSubmit: data => Creators.submitAddressForm({ data, callbacks })(dispatch),
  onCancel: () =>
    dispatch([
      CheckoutActions.setEditedShipmentAddress(null),
      CheckoutActions.setStep(steps.shipping)
    ])
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressForm)
