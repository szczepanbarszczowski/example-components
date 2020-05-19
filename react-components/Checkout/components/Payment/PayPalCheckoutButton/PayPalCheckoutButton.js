import React, { useCallback } from 'react'
import { equals, path } from 'ramda'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import cn from 'classnames'
import withStyles from 'lib/withStyles'
import { api } from 'sagas/index'
import useOrderDataByProvider from 'lib/hooks/useOrderDataByProvider'

import { selectSelectedPaymentMethod } from 'selectors/stateSelectors/checkoutSelectors'
import {
  paymentMethods,
  provider,
  token,
  complete
} from 'reduxConstants/checkout'

import { CheckoutApiActions } from 'actions/apiActions/checkoutApiActions'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import s from './PaypalCheckoutButton.module.scss'

const selectIsActive = createSelector(
  selectSelectedPaymentMethod,
  equals(paymentMethods.payPal)
)

const PayPalCheckoutButton = () => {
  const dispatch = useDispatch()
  const isActive = useSelector(selectIsActive)
  const orderData = useOrderDataByProvider(paymentMethods.payPal)

  const getOrderData = useCallback(
    () => {
      try {
        return api.submitOrder(orderData)
      } catch (e) {
        dispatch(CheckoutApiActions.setError(e))
      }
    },
    [orderData]
  )

  const getPaymentStatus = useCallback(data => {
    try {
      return api.getPaymentStatus(data)
    } catch (e) {
      dispatch(CheckoutApiActions.setError(e))
    }
  }, [])

  const cancelOrder = useCallback(() => {
    dispatch(CheckoutActions.cancelOrder())
  }, [])

  const createOrder = useCallback(async () => {
    const response = await getOrderData()

    if (response && response.ok) {
      dispatch(CheckoutActions.setOrderId(response.data.uuid))
      return response.data.paymentId
    } else {
      dispatch(CheckoutApiActions.setError(path(['data', 'message'], response)))
    }
  }, [])

  const onApprove = useCallback(async data => {
    const response = await getPaymentStatus({
      [provider]: paymentMethods.payPal,
      [token]: data.orderID
    })

    if (response && response.data.status === complete) {
      dispatch(CheckoutApiActions.orderSuccess(response.data.uuid))
    }
  }, [])

  if (!global.paypal) return null

  const Button = global.paypal.Buttons.driver('react', {
    React,
    ReactDOM
  })

  return (
    <div className={cn({ [s.paypalButtonWrapperDisabled]: !isActive })}>
      <Button
        onApprove={onApprove}
        createOrder={createOrder}
        onCancel={cancelOrder}
        style={{
          layout: 'horizontal',
          color: 'black',
          shape: 'pill',
          label: 'pay'
        }}
      />
    </div>
  )
}

export default withStyles(s)(PayPalCheckoutButton)
