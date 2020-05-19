import React from 'react'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import { withProps } from 'recompose'
import { withI18next } from 'lib'

import { cardValidator as validate } from 'app/validators'
import GenericForm from 'components/CreditCardForm'
import { creditCardCheckout } from 'constants/formNames'

const blackPropsMapper = () => ({
  Form: <GenericForm />,
  initialValues: {
    default: true
  }
})

export default compose(
  withI18next(),
  withProps(blackPropsMapper),
  reduxForm({
    form: creditCardCheckout,
    validate
  })
)
