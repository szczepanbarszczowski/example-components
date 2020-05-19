import { connect } from 'react-redux'
import { indexOf } from 'ramda'
import { createSelector, createStructuredSelector } from 'reselect'
import {
  selectUserCreditCardIds,
  selectUserCreditCards
} from 'selectors/userSelectors'
import { selectSelectedPayment } from 'selectors/stateSelectors/checkoutSelectors'

import CreditCardSlider from './CreditCardSlider'

const getSelectedCreditCardIndex = createSelector(
  selectSelectedPayment,
  selectUserCreditCardIds,
  indexOf
)

const mapStateToProps = createStructuredSelector({
  creditCards: selectUserCreditCards,
  selectedCreditCardIndex: getSelectedCreditCardIndex
})

export default connect(mapStateToProps)(CreditCardSlider)
