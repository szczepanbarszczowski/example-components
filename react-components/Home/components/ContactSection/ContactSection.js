import React from 'react'

import ContactForm from './components/ContactForm/ContactForm'
import c from './ContactSection.module.scss'

export const ContactSection = () => (
  <div className={c.wrapper} data-cy="contact">
    <h3 className={c.title}>Let us design your idea</h3>

    <div className={c.formWrap}>
      <ContactForm className={c.form} />
    </div>
  </div>
)

export default ContactSection
