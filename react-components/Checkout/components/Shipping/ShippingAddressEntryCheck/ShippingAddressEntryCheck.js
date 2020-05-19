import { compose } from 'recompose'
import { connect } from 'react-redux'
import { equals } from 'ramda'
import { createSelector } from 'reselect'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import { trackCheckoutStep } from 'sagas/trackingSagasHelpers'
import {
  selectSelectedShipmentAddress,
  selectIsCheckoutPageLocked
} from 'selectors/stateSelectors/checkoutSelectors'
import Icon from 'components/Icon'

import withStyles from 'lib/withStyles'

import s from './ShippingAddressEntryCheck.module.scss'

const isCheckedSelector = createSelector(
  selectSelectedShipmentAddress,
  (state, payload) => payload,
  equals
)

const mapStateToProps = (state, { id }) => ({
  checked: isCheckedSelector(state, id),
  disabled: selectIsCheckoutPageLocked(state),
  className: s.check,
  name: 'check'
})

const mapDispatchToProps = (dispatch, { id }) => ({
  onClick: () => {
    trackCheckoutStep('shipping_step_option', 'Existing Address')
    return dispatch(CheckoutActions.setShipmentAddress(id))
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(s)
)(Icon)
