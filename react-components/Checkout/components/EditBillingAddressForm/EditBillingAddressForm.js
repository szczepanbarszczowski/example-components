import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { equals } from 'ramda'

import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import { selectUserAddressById } from 'selectors/userSelectors'
import { selectEditedBillingAddress } from 'selectors/stateSelectors/checkoutSelectors'
import { Creators } from 'actions/formActions'
import userCreators from 'actions/userActions'

import AddressForm from '../Shipping/AddressForm'

const getHidden = createSelector(
  selectEditedBillingAddress,
  (state, payload) => payload,
  (editedBillingAddress, { id }) => !equals(editedBillingAddress, id)
)

const mapStateToProps = (state, { id }) => {
  const selectUserAddressByIdSelector = selectUserAddressById()
  return {
    isHidden: getHidden(state, { id }),
    disabled: selectEditedBillingAddress(state),
    initialValues: selectUserAddressByIdSelector(state, id)
  }
}

const callbacks = [
  () => CheckoutActions.setEditedBillingAddress(null),
  userCreators.getUserSuccess,
  (_data, id) => CheckoutActions.setBillingAddress(id)
]

const mapDispatchToProps = (dispatch, { id }) => ({
  onSubmit: data => Creators.submitAddressForm({ data, callbacks })(dispatch),
  onClick: () => id && dispatch(CheckoutActions.setBillingAddress(id)),
  onCancel: () => dispatch(CheckoutActions.setEditedBillingAddress(null))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressForm)
