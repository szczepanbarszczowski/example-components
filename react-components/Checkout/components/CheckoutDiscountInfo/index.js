import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { withI18next, withIsHidden } from 'lib'
import {
  selectCalculationCurrencyCode,
  selectDiscountError,
  selectDiscountType,
  selectDiscountDetails,
  selectDiscountValue,
  selectDiscountAmount
} from 'selectors/apiSelectors/calculationSelectors'
import CheckoutDiscountInfo from './CheckoutDiscountInfo'
import { getDiscountLabel } from './helpers'

const isHiddenSelector = createSelector(
  selectDiscountDetails,
  selectDiscountError,
  (hasDetails, hasError) => !hasDetails || hasError
)

const mapStateToProps = createStructuredSelector({
  type: selectDiscountType,
  isHidden: isHiddenSelector,
  amount: selectDiscountAmount,
  value: selectDiscountValue,
  currency: selectCalculationCurrencyCode
})

const props = ({ t, type, value, amount, currency }) => ({
  label: `${t('promo_code_label', {
    type: getDiscountLabel(type, value, currency, t)
  })}`,
  discountValue:
    type === 'FreeShipping'
      ? ''
      : `-${t('currency', { data: { value: amount, currency } })}`
})

export default compose(
  withI18next(),
  connect(mapStateToProps),
  withIsHidden,
  withProps(props)
)(CheckoutDiscountInfo)
