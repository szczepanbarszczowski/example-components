import { isEmpty, nthArg } from 'ramda'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { withI18next } from 'lib'

import {
  getUserAddresses,
  selectUserCreditCards
} from 'selectors/userSelectors'
import { paymentForm, addressForm } from '../../constants'
import Component from './CancelButton'

const isHiddenSelector = createSelector(
  getUserAddresses,
  selectUserCreditCards,
  nthArg(1),
  (addresses, cards, type) => {
    const formTypes = {
      [addressForm]: isEmpty(addresses),
      [paymentForm]: isEmpty(cards)
    }

    return formTypes[type]
  }
)

const mapStateTopProps = (state, { type }) => ({
  isHidden: isHiddenSelector(state, type)
})

const CancelButton = compose(
  withI18next(),
  connect(mapStateTopProps)
)(Component)

export default CancelButton
