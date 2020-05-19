import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { withI18next } from 'lib'

import { selectCalculationCurrencyCode } from 'selectors/apiSelectors/calculationSelectors'

import ShipmentOption from './ShipmentOption'

const mapStateToProps = createStructuredSelector({
  currency: selectCalculationCurrencyCode
})

export default compose(
  withI18next(),
  connect(mapStateToProps)
)(ShipmentOption)
