import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getUserAddresses } from 'selectors/userSelectors'

import ShippingAddressList from './ShippingAddressList'

const mapStateToProps = createStructuredSelector({
  addresses: getUserAddresses
})

export default connect(mapStateToProps)(ShippingAddressList)
