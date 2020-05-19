import { compose, setStatic, withProps } from 'recompose'
import { withI18next, withPageTracking } from 'lib'
import { steps } from 'reduxConstants/checkout'
import { CheckoutActions } from 'actions'
import { CHECKOUT_SUCCESS } from 'constants/pageNames'

import Checkout from './default/Checkout'

const getInitialProps = ctx => {
  const { store } = ctx

  store.dispatch(CheckoutActions.setStep(steps.confirmation))
}

const props = () => ({
  currentStep: steps.confirmation
})

export default compose(
  withI18next(['common', 'product']),
  withPageTracking(CHECKOUT_SUCCESS),
  setStatic('getInitialProps', getInitialProps),
  withProps(props)
)(Checkout)
