import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withIsHidden } from 'lib'

import { selectErrors } from 'selectors/apiSelectors/checkoutApiSelectors'
import SubmitError from './SubmitError'

const mapStateToProps = state => ({
  isHidden: !selectErrors(state),
  error: selectErrors(state)
})

export default compose(
  connect(mapStateToProps),
  withIsHidden
)(SubmitError)
