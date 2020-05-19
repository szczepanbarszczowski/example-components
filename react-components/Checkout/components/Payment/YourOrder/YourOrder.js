import React from 'react'
import CartContent from 'components/Cart/CartContent'
import CartEmpty from 'components/Cart/CartEmpty'
import CheckoutOrderItems from 'components/Checkout/CheckoutOrderItems'
import CartLoader from 'components/Cart/CartLoader'

import withStyles from 'lib/withStyles'

import s from './YourOrder.module.scss'

const YourOrder = () => (
  <div className={s.wrapper}>
    <CartEmpty />
    <CartLoader />
    <CartContent>
      <CheckoutOrderItems />
    </CartContent>
  </div>
)

export default withStyles(s)(YourOrder)
