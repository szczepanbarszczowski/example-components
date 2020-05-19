import { connect } from 'react-redux'
import { compose } from 'recompose'
import { createSelector, createStructuredSelector } from 'reselect'
import { withProps } from 'recompose'
import { not } from 'ramda'

import {
  selectCalculationCurrencyCode,
  selectCalculationState,
  selectCalculationStoreCredit
} from 'selectors/apiSelectors/calculationSelectors'
import { withI18next, withIsHidden } from 'lib'
import CheckoutStoreCredits from './CheckoutStoreCredits'

const isHiddenSelector = createSelector(
  selectCalculationState,
  selectCalculationStoreCredit,
  (state, credit) => not(state) || not(credit > 0)
)

const mapStateToProps = createStructuredSelector({
  isHidden: isHiddenSelector,
  currency: selectCalculationCurrencyCode,
  value: selectCalculationStoreCredit
})

const props = ({ t }) => ({
  label: t('store_credit')
})

export default compose(
  withI18next(),
  connect(mapStateToProps),
  withIsHidden,
  withProps(props)
)(CheckoutStoreCredits)
