import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { selectUserCreditCards } from 'selectors/userSelectors'
import CreditCardList from './CreditCardList'

const mapStateToProps = createStructuredSelector({
  creditCards: selectUserCreditCards
})

export default connect(mapStateToProps)(CreditCardList)
