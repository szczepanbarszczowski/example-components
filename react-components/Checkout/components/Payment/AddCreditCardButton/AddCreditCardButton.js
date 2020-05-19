import { connect } from 'react-redux'
import { compose } from 'recompose'
import { isEmpty } from 'ramda'
import { createSelector } from 'reselect'
import { withI18next } from 'lib/withI18next'
import Button from 'components/Buttons/Button'

import { selectUserCreditCards } from 'selectors/userSelectors'
import {
  selectIsAddingPaymentCard,
  selectIsCheckoutPageLocked
} from 'selectors/stateSelectors/checkoutSelectors'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import withIsHidden from 'lib/withIsHidden'

import withStyles from 'lib/withStyles'

import s from './AddCreditCardButton.module.scss'

const isHiddenSelector = createSelector(
  selectIsAddingPaymentCard,
  selectUserCreditCards,
  (isAddingPaymentCard, creditCards) =>
    isAddingPaymentCard || isEmpty(creditCards)
)

const mapStateToProps = (state, { t }) => ({
  isHidden: isHiddenSelector(state),
  active: !selectIsCheckoutPageLocked(state),
  buttonStyleType: 'link',
  style: s.button,
  text: t('add_credit_card')
})

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(CheckoutActions.setIsAddingPaymentCard(true))
})

export default compose(
  withI18next(['product']),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withIsHidden,
  withStyles(s)
)(Button)
