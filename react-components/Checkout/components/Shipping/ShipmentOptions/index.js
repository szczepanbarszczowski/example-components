import { connect } from 'react-redux'

import { selectCalculationShipmentMethods } from 'selectors/apiSelectors/calculationSelectors'
import ShipmentOptions from './ShipmentOptions'

const mapStateToProps = state => ({
  shipmentOptions: selectCalculationShipmentMethods(state) || []
})

export default connect(mapStateToProps)(ShipmentOptions)
