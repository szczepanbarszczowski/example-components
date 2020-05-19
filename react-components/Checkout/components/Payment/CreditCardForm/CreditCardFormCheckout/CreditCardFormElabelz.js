import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withProps, lifecycle } from 'recompose'
import cn from 'classnames'
import { withI18next } from 'lib'

import { CheckoutActions, CreditCardsActions } from 'actions'
import {
  initCheckoutJs,
  submitCheckoutJs,
  destroyCheckoutJs,
  checkoutJsContainerClassName
} from 'services/checkoutJs'
import userCreators from 'actions/userActions'
import { getCheckoutPublicKey } from 'selectors/stateSelectors/currencySelectors'
import {
  selectCardFormIsSubmitting,
  selectCardFormIsValid,
  selectCardFormError
} from 'selectors/stateSelectors/creditCardsSelectors'

import withStyles from 'lib/withStyles'

import s from './CreditCardForm.module.scss'

const callbacks = [
  () => CheckoutActions.setIsAddingPaymentCard(false),
  userCreators.getUserSuccess,
  (_data, id) => CheckoutActions.setPayment(id)
]

const mapStateToProps = state => ({
  checkoutPk: getCheckoutPublicKey(state),
  submitting: selectCardFormIsSubmitting(state),
  valid: selectCardFormIsValid(state),
  error: selectCardFormError(state)
})

const mapDispatchToProps = dispatch => ({
  onSubmit: event => {
    event.preventDefault()
    dispatch(CreditCardsActions.submitCreditCardForm())
    submitCheckoutJs()
  },
  onCardTokenised: token =>
    dispatch(CreditCardsActions.submitCreditCardToken(token, callbacks)),
  onCardTokenisationFailed: () =>
    dispatch(CreditCardsActions.submitCreditCardFormFailure()),
  onCardValidationChanged: isValid =>
    dispatch(CreditCardsActions.changeCreditCardFormValidation(isValid)),
  reset: () => dispatch(CreditCardsActions.resetCreditCardForm())
})

function componentDidMount() {
  initCheckoutJs({
    t: this.props.t,
    publicKey: this.props.checkoutPk,
    onCardValidationChanged: this.props.onCardValidationChanged,
    onCardTokenised: this.props.onCardTokenised,
    onCardTokenisationFailed: this.props.onCardTokenisationFailed
  })
}

function componentWillUnmount() {
  destroyCheckoutJs()
  this.props.reset()
}

const propsMapper = () => ({
  Form: (
    <div
      className={cn(
        checkoutJsContainerClassName,
        s[checkoutJsContainerClassName]
      )}
    />
  )
})

export default compose(
  withI18next(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(propsMapper),
  lifecycle({ componentDidMount, componentWillUnmount }),
  withStyles(s)
)
