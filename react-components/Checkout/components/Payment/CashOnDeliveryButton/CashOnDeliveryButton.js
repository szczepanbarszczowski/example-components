import React from 'react'
import { connect } from 'react-redux'
import { equals, not } from 'ramda'
import { createSelector, createStructuredSelector } from 'reselect'
import { compose, withProps } from 'recompose'
import cn from 'classnames'

import { paymentMethods } from 'reduxConstants/checkout'
import { selectSelectedPaymentMethod } from 'selectors/stateSelectors/checkoutSelectors'
import { selectIsPayByCashOnly } from 'selectors/apiSelectors/calculationSelectors'
import { getCartItems } from 'selectors/cartSelectors'

import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import { withI18next, withIsHidden } from 'lib'
import { selectIsCODAvailable } from 'selectors/apiSelectors/calculationSelectors'
import { CalculationActions, CheckoutApiActions } from 'actions'
import { Cash } from 'components/Icon/constants'
import { trackCheckoutStep } from 'sagas/trackingSagasHelpers'
import withStyles from 'lib/withStyles'

import CheckoutButton from '../CheckoutButton'

import s from './CashOnDeliveryButton.module.scss'

const selectIsActive = createSelector(
  selectSelectedPaymentMethod,
  state => !equals(paymentMethods.cashOnDelivery)(state)
)

const selectIsHidden = createSelector(selectIsCODAvailable, not)

const mapStateToProps = createStructuredSelector({
  active: selectIsActive,
  isHidden: selectIsHidden,
  disabled: selectIsPayByCashOnly,
  cartItems: getCartItems
})

const mapDispatchToProps = {
  setPaymentMethod: CheckoutActions.setPaymentMethod,
  setIsAddingPaymentCard: CheckoutActions.setIsAddingPaymentCard,
  setCheckoutError: CheckoutApiActions.setError,
  fetchCalculations: CalculationActions.fetch
}

const props = ({
  t,
  active,
  setPaymentMethod,
  setIsAddingPaymentCard,
  setCheckoutError,
  fetchCalculations,
  cartItems
}) => ({
  children: React.createElement(Cash, {
    className: cn(s.icon, {
      [s.iconActive]: !active
    })
  }),
  text: t('payByCash'),
  onClick: () => {
    trackCheckoutStep(
      'payment_step_option',
      paymentMethods.cashOnDelivery,
      cartItems
    )
    setPaymentMethod(paymentMethods.cashOnDelivery)
    setIsAddingPaymentCard(false)
    setCheckoutError(null)
    fetchCalculations()
  }
})

export default compose(
  withI18next(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(props),
  withIsHidden,
  withStyles(s)
)(CheckoutButton)
