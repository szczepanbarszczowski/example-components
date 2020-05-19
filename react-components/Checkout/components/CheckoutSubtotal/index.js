import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { compose, withProps } from 'recompose'
import { not } from 'ramda'

import {
  selectCalculationCurrencyCode,
  selectCalculationState,
  selectProductsCost
} from 'selectors/apiSelectors/calculationSelectors'
import { withI18next, withIsHidden } from 'lib'
import CheckoutSubtotal from './CheckoutSubtotal'

const isHiddenSelector = createSelector(selectCalculationState, not)

const mapStateToProps = createStructuredSelector({
  isHidden: isHiddenSelector,
  currency: selectCalculationCurrencyCode,
  value: selectProductsCost
})

const props = ({ t }) => ({
  label: t('subtotal')
})

export default compose(
  withI18next(),
  connect(mapStateToProps),
  withIsHidden,
  withProps(props)
)(CheckoutSubtotal)
