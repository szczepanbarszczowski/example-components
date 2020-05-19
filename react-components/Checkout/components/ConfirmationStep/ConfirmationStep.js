import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
import { identical } from 'ramda'

import { steps } from 'app/redux/constants/checkout'
import { withI18next } from 'lib/withI18next'
import { selectCurrentStep } from 'selectors/stateSelectors/checkoutSelectors'
import Step from 'components/Step'

const isConfirmationStep = identical(steps.confirmation)

const mapStateToProps = state => ({
  isActive: isConfirmationStep(selectCurrentStep(state))
})

const props = ({ t }) => ({
  no: 3,
  label: t('confirmation'),
  canEnterStep: false,
  hasNext: false,
  isDone: false
})

export default compose(
  withI18next(),
  connect(mapStateToProps),
  withProps(props)
)(Step)
