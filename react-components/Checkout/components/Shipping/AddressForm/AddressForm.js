import React from 'react'
import { func, bool, string } from 'prop-types'
import Button from 'components/Buttons/Button'
import { AddressForm as GeneralAddressForm } from 'components/AddressForm'
import withStyles from 'lib/withStyles'
import ArrowBackButton from '../../ArrowBackButton'
import { addressForm } from '../../../constants'
import s from './AddressForm.module.scss'

const AddressForm = ({
  t,
  handleSubmit,
  showStateField,
  error,
  onCancel,
  valid,
  submitting
}) => (
  <form className={s.wrapper} onSubmit={handleSubmit}>
    <ArrowBackButton onClick={onCancel} label={t('back_to_addresses')} />
    <h3 className={s.title}>{t('new_address')}</h3>
    <section className={s.section}>
      <GeneralAddressForm
        fromAddressBook={true}
        showSaveToAddressBook={false}
        showStateField={showStateField}
        instanceId={addressForm}
        formName={addressForm}
      />
      {error && <span className={s.error}>{error}</span>}
      <div className={s.buttons}>
        <Button
          text={t('common:save_address')}
          type="submit"
          active={valid || !submitting}
          isLoading={submitting}
          buttonStyleType="primary"
          style={s.button}
        />
      </div>
    </section>
  </form>
)

AddressForm.propTypes = {
  t: func.isRequired,
  handleSubmit: func.isRequired,
  showStateField: bool,
  onCancel: func.isRequired,
  error: string,
  valid: bool,
  submitting: bool
}

export default withStyles(s)(AddressForm)
