import { connect } from 'react-redux'
import { compose } from 'recompose'
import { any, identity, and, not } from 'ramda'
import { createSelector } from 'reselect'

import { submit } from 'redux-form'
import { withI18next } from 'lib/withI18next'

import { steps } from 'app/redux/constants/checkout'
import {
  selectSelectedShipmentAddress,
  selectIsAddingShipmentAddress,
  selectEditedShipmentAddress,
  selectIsCheckoutPageLocked
} from 'selectors/stateSelectors/checkoutSelectors'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import { scrollToPosition } from 'services/scroll'

import { addressForm } from 'constants/formNames'
import ContinueToBillingButton from './ContinueToBillingButton'

const mergeStateAndDispatchToProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onClick: dispatchProps.onClick(stateProps.isFormVisible)
})

const getAddingShipmentAddress = createSelector(
  selectIsAddingShipmentAddress,
  selectEditedShipmentAddress,
  (...args) => any(identity)(args)
)

const isActiveSelector = createSelector(
  selectSelectedShipmentAddress,
  selectIsCheckoutPageLocked,
  (hasSelectedAddress, isLocked) => and(not(isLocked), !!hasSelectedAddress)
)

const mapStateToProps = (state, { t }) => ({
  text: t('continue'),
  buttonStyleType: 'primary-dark',
  isFormVisible: !isActiveSelector(state) || getAddingShipmentAddress(state)
})

const mapDispatchToProps = dispatch => ({
  onClick: isFormVisible => () => {
    if (isFormVisible) {
      dispatch([
        CheckoutActions.setShouldRedirectToPaymentPage(true),
        submit(addressForm)
      ])
    } else {
      dispatch([
        CheckoutActions.setShouldRedirectToPaymentPage(false),
        CheckoutActions.setStep(steps.payment)
      ])
      scrollToPosition()
    }
  }
})

export default compose(
  withI18next(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeStateAndDispatchToProps
  )
)(ContinueToBillingButton)
