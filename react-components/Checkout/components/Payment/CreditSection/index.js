import { createStructuredSelector, createSelector } from 'reselect'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { getCreditBalance } from 'selectors/userSelectors'
import { selectCalculationCurrencyCode } from 'selectors/apiSelectors/calculationSelectors'
import { withI18next, withIsHidden } from 'lib'

import CreditSection from './CreditSection'

const isHiddenSelector = createSelector(
  getCreditBalance,
  creditBalance => creditBalance <= 0
)

const mapStateToProps = createStructuredSelector({
  balance: getCreditBalance,
  currency: selectCalculationCurrencyCode,
  isHidden: isHiddenSelector
})

export default compose(
  withI18next(),
  connect(mapStateToProps),
  withIsHidden
)(CreditSection)
