import { connect } from 'react-redux'
import { includes, not } from 'ramda'
import { createSelector } from 'reselect'
import { compose, withProps, withHandlers } from 'recompose'

import { steps } from 'reduxConstants/checkout'
import { withI18next } from 'lib/withI18next'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import {
  selectIsCheckoutPageLocked,
  selectIsCheckoutFinished,
  selectCurrentStep
} from 'selectors/stateSelectors/checkoutSelectors'

import Step from 'components/Step'

const canEnterStepSelector = createSelector(
  selectIsCheckoutPageLocked,
  selectIsCheckoutFinished,
  (isPageLocked, isCheckoutFinished) =>
    not(isPageLocked) && not(isCheckoutFinished)
)

const mapStateToProps = state => ({
  canEnterStep: canEnterStepSelector(state),
  isActive: includes(selectCurrentStep(state), [
    steps.shipping,
    steps.shippingAddressForm
  ]),
  isDone: includes(selectCurrentStep(state), [
    steps.payment,
    steps.confirmation
  ])
})

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(CheckoutActions.setStep(steps.shipping))
})

const handlers = {
  onClick: ({ canEnterStep, onClick }) => () => canEnterStep && onClick()
}

const props = ({ t }) => ({
  no: 1,
  label: t('shipping'),
  hasNext: true
})

export default compose(
  withI18next(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(props),
  withHandlers(handlers)
)(Step)
