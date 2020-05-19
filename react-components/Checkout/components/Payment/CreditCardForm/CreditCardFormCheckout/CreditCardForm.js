import React from 'react'
import { bool, func, string, node } from 'prop-types'

import Button from 'components/Buttons/Button'
import { checkoutJsFormId } from 'services/checkoutJs'
import withStyles from 'lib/withStyles'
import { paymentForm } from '../../../../constants'
import CancelButton from '../../../CancelButton'
import s from './CreditCardForm.module.scss'

const CreditCardForm = ({
  t,
  onSubmit,
  error,
  onCancel,
  valid,
  submitting,
  Form
}) => (
  <form className={s.wrapper} onSubmit={onSubmit} id={checkoutJsFormId}>
    {Form}
    {error && <span className={s.error}>{error}</span>}
    <div className={s.buttons}>
      <Button
        active={valid && !submitting}
        text={t('save_card')}
        type="submit"
        isLoading={submitting}
        buttonStyleType="light"
      />
      <CancelButton onClick={onCancel} type={paymentForm} />
    </div>
  </form>
)

CreditCardForm.propTypes = {
  t: func.isRequired,
  onSubmit: func.isRequired,
  onCancel: func.isRequired,
  error: string,
  valid: bool,
  submitting: bool,
  Form: node
}

export default withStyles(s)(CreditCardForm)
