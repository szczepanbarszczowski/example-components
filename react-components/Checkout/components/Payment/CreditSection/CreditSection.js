import React from 'react'
import { Trans } from 'react-i18next'
import { CreditElabelz } from 'components/Icon/constants'

import withStyles from 'lib/withStyles'

import s from './CreditSection.module.scss'

const CreditSection = ({ t, i18n, balance, currency }) => (
  <>
    <h5 className={s.sectionSubHeading}>{t('store_credit')}</h5>
    <div className={s.wrapper}>
      <CreditElabelz className={s.icon} />
      <span>
        <Trans t={t} i18n={i18n} i18nKey="store_credit_balance_note">
          You have <strong>{{ data: { value: balance, currency } }}</strong> in
          Credit. This will be used in transaction
        </Trans>
      </span>
    </div>
  </>
)

export default withStyles(s)(CreditSection)
