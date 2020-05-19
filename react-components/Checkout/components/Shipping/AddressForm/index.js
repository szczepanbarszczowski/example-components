import { toLower, isEmpty } from 'ramda'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector, change } from 'redux-form'
import { compose } from 'recompose'
import { CitiesActions, PhoneValidationActions } from 'actions'
import { withI18next } from 'lib'
import { addressValidator } from 'app/validators'
import { CheckoutActions } from 'actions/stateActions/checkoutActions'
import { scrollToFormWhenError } from 'services/scroll'
import { getCodeById } from 'selectors/apiSelectors/countrySelectors'
import { addressForm } from 'constants/formNames'
import countryCodes from 'constants/countryCodes'
import AddressForm from './AddressForm'

const mapStateToProps = state => {
  const formSelector = formValueSelector(addressForm)
  const country = formSelector(state, 'country')
  const getCodeByIdSelector = getCodeById()
  const countryCode = getCodeByIdSelector(state, country)

  return {
    countryCode,
    showStateField: countryCode && toLower(countryCode) === countryCodes.US
  }
}

const asyncValidate = (values, dispatch, { t }) =>
  new Promise((resolve, reject) => {
    if (values.phoneNumber && values.phoneNumberCC) {
      dispatch(
        PhoneValidationActions.fetch({
          formName: addressForm,
          resolve,
          reject,
          t
        })
      )
    }
  })

export default compose(
  withI18next(),
  connect(mapStateToProps),
  reduxForm({
    form: addressForm,
    onChange: (values, dispatch, props, previousValues) => {
      const { country, state } = values
      const stateToFetch = props.showStateField ? state : null

      const isCountryChanged =
        country && previousValues.country && previousValues.country !== country
      const isStateChanged = stateToFetch && previousValues.state !== state

      dispatch(CheckoutActions.setShouldRedirectToPaymentPage(false))

      if (isEmpty(previousValues)) return

      if (isCountryChanged) {
        dispatch(change(addressForm, 'city', null))
        dispatch(change(addressForm, 'state', null))
      }

      if (isStateChanged) {
        dispatch(change(addressForm, 'city', null))
      }

      if (isCountryChanged || isStateChanged) {
        dispatch(CitiesActions.setData([]))
        if (props.showStateField && !state) return

        dispatch(CitiesActions.fetch(country, stateToFetch))
      }
    },
    onSubmitFail: errors => scrollToFormWhenError(errors),
    enableReinitialize: true,
    validate: addressValidator,
    asyncBlurFields: ['phoneNumber', 'phoneNumberCC'],
    asyncValidate
  })
)(AddressForm)
