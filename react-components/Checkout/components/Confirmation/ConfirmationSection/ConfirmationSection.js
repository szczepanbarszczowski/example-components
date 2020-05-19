import React, { useEffect, memo, useMemo, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'

import { OrderApiActions } from 'actions'
import { getFirstName } from 'selectors/userSelectors'
import {
  selectOrderById,
  selectOrderPaymentById
} from 'selectors/apiSelectors/ordersSelectors'
import { selectQuery } from 'selectors/routerSelectors'
import { pending, complete, failed } from 'reduxConstants/checkout'
import withStyles from 'lib/withStyles'

import { AppContext } from 'components/AppContext'
import { isPayfort } from 'services/configurationCheck'
import cardStyle from 'app/styles/elabelz/components/base.scss'
import ConfirmationLoader from '../ConfirmationLoader'
import ConfirmationContent from '../ConfirmationContent'
import ConfirmationContentPending from '../ConfirmationContentPending'
import s from './ConfirmationSection.module.scss'

const ConfirmationSection = memo(() => {
  const { appTheme } = useContext(AppContext)
  const dispatch = useDispatch()

  const { orderId } = useSelector(selectQuery)
  const selectOrderByIdSelector = selectOrderById()
  const selectOrderPaymentByIdSelector = selectOrderPaymentById()
  const name = useSelector(getFirstName)

  const { status } = useSelector(state =>
    selectOrderPaymentByIdSelector(state, orderId)
  )

  const { orderNumber } = useSelector(state =>
    selectOrderByIdSelector(state, orderId)
  )

  const confirmationPages = useMemo(
    () => ({
      [pending]: (
        <ConfirmationContentPending
          key={orderNumber + name}
          name={name}
          orderNumber={orderNumber}
        />
      ),
      [complete]: (
        <ConfirmationContent
          key={orderNumber + name}
          name={name}
          orderNumber={orderNumber}
        />
      ),
      [failed]: (
        <ConfirmationContentPending
          key={orderNumber + name}
          name={name}
          orderNumber={orderNumber}
        />
      )
    }),
    [orderNumber, name]
  )

  useEffect(() => {
    dispatch(OrderApiActions.fetch())
  }, [])

  return (
    <div className={cn(s.wrapper, s.themelabelz)}>
      <div className={cn(cardStyle.card, s.content)}>
        <ConfirmationLoader key={orderNumber} orderNumber={orderNumber} />
        {confirmationPages[isPayfort ? status : complete] || (
          <ConfirmationContent
            key={orderNumber + name}
            name={name}
            orderNumber={orderNumber}
          />
        )}
      </div>
    </div>
  )
})

export default withStyles(s, cardStyle)(ConfirmationSection)
