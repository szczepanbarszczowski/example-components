import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { equals } from 'ramda'
import { createSelector } from 'reselect'
import {
  selectSelectedPayment,
  selectIsCheckoutPageLocked
} from 'selectors/stateSelectors/checkoutSelectors'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import { CheckoutApiActions } from 'actions'

import CreditCardListItem from './CreditCardListItem'

const isCheckedSelector = createSelector(
  selectSelectedPayment,
  (state, payload) => payload,
  equals
)

const mapStateToProps = (state, { card: { id } }) => ({
  checked: isCheckedSelector(state, id),
  disabled: selectIsCheckoutPageLocked(state)
})

const mapDispatchToProps = (dispatch, { card: { id } }) => ({
  onClick: () =>
    id &&
    dispatch([
      CheckoutActions.setPayment(id),
      CheckoutApiActions.setError(null)
    ])
})

const handlers = {
  onClick: ({ disabled, onClick }) => () => !disabled && onClick()
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers(handlers)
)(CreditCardListItem)
