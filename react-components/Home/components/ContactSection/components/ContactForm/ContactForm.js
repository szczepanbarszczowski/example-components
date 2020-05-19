import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import reduxForm from 'redux-form/lib/reduxForm'
import Field from 'redux-form/lib/Field'
import { email, length, required } from 'redux-form-validators'
import Input from 'components/fields/Input/Input'
import Textarea from 'components/fields/Textarea/Textarea'
import { estimateRequest } from 'modules/estimate'
import { ArrowButton } from 'components/Controls/ArrowButton'
import c from './ContactForm.module.scss'

const ContactForm = ({ handleSubmit, onSubmit, isSubmitting, className, fromCaseStudy }) => (
  <form onSubmit={handleSubmit(onSubmit)} className={className}>
    <Field
      name="name"
      placeholder="Your name"
      component={Input}
      validate={[required({ msg: 'Required.' }), length({ min: 2, msg: 'Please enter at least 2 characters.' })]}
    />
    <Field
      name="email"
      placeholder="Your e-mail"
      component={Input}
      validate={[required({ msg: 'Required.' }), email({ msg: 'Please enter a valid email address.' })]}
    />
    <Field
      name="description"
      placeholder="Your message"
      component={Textarea}
      validate={[
        required({ msg: 'Required.' }),
        length({
          min: 10,
          msg: "Please tell us a bit more, we'd love to hear about your project! Please enter at least 10 characters.",
        }),
      ]}
    />

    <ArrowButton submitting={isSubmitting} type="submit" className={c.btn}>
      {fromCaseStudy ? 'Hire us' : 'Send the message'}
    </ArrowButton>
  </form>
)

export default connect(
  state => ({
    isSubmitting: state.estimate.submitting,
  }),
  { onSubmit: estimateRequest }
)(
  reduxForm({
    form: 'estimate',
    pure: true,
  })(ContactForm)
)

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  className: PropTypes.string,
  fromCaseStudy: PropTypes.bool,
}

ContactForm.defaultProps = {
  className: '',
  fromCaseStudy: false,
}
