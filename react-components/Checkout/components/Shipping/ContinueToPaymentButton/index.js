import { connect } from 'react-redux'
import { compose, not, isNil } from 'ramda'
import { withProps } from 'recompose'
import { createSelector } from 'reselect'
import { withI18next } from 'lib/withI18next'
import Button from 'components/Buttons/Button'
import { CheckoutActions } from 'actions'
import { steps } from 'reduxConstants/checkout'
import { selectSelectedShipmentAddress } from 'selectors/stateSelectors/checkoutSelectors'
import { scrollToPosition } from 'services/scroll'

const isActiveSelector = createSelector(
  selectSelectedShipmentAddress,
  compose(
    not,
    isNil
  )
)

const props = {
  buttonStyleType: 'primary-dark'
}

const mapStateToProps = (state, { t }) => ({
  text: t('continue'),
  active: isActiveSelector(state),
  addressId: selectSelectedShipmentAddress(state)
})

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(CheckoutActions.setStep(steps.payment))
    scrollToPosition()
  }
})

export default compose(
  withI18next(),
  withProps(props),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Button)
