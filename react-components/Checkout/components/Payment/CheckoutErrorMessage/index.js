import { connect } from 'react-redux'
import { compose } from 'recompose'
import { not } from 'ramda'
import { createSelector, createStructuredSelector } from 'reselect'
import { selectCalculationErrors } from 'selectors/apiSelectors/calculationSelectors'
import { selectErrors } from 'selectors/apiSelectors/checkoutApiSelectors'
import { withIsHidden } from 'lib'

import CheckoutErrorMessage from './CheckoutErrorMessage'

const errorMessageSelector = createSelector(
  selectCalculationErrors,
  selectErrors,
  (calculationsErrors, submitErrors) => calculationsErrors || submitErrors
)

const isHiddenSelector = createSelector(errorMessageSelector, not)

const mapStateToProps = createStructuredSelector({
  message: errorMessageSelector,
  isHidden: isHiddenSelector
})

export default compose(
  connect(mapStateToProps),
  withIsHidden
)(CheckoutErrorMessage)
