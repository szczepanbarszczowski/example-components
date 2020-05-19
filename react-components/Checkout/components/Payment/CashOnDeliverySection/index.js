import { compose, withProps } from 'recompose'
import { not, pipe, equals } from 'ramda'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'

import { withIsHidden } from 'lib'
import { withI18next } from 'lib/withI18next'
import { selectSelectedPaymentMethod } from 'selectors/stateSelectors/checkoutSelectors'
import { paymentMethods } from 'reduxConstants/checkout'
import {
  selectCalculationCODPrice,
  selectCalculationCurrencyCode
} from 'selectors/apiSelectors/calculationSelectors'
import CashOnDeliverySection from './CashOnDeliverySection'

const selectIsHidden = createSelector(
  selectSelectedPaymentMethod,
  pipe(
    equals(paymentMethods.cashOnDelivery),
    not
  )
)

const mapStateToProps = createStructuredSelector({
  price: selectCalculationCODPrice,
  currencyCode: selectCalculationCurrencyCode,
  isHidden: selectIsHidden
})

const props = ({ t, price, currencyCode }) => ({
  label: t('cod_description', {
    price: t('common:currency', {
      data: { value: price, currency: currencyCode }
    })
  })
})

export default compose(
  withI18next('product', 'common'),
  connect(mapStateToProps),
  withIsHidden,
  withProps(props)
)(CashOnDeliverySection)
