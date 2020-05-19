import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import cn from 'classnames'

import { selectIsPayByCashOnly } from 'selectors/apiSelectors/calculationSelectors'
import { CreditElabelz } from 'components/Icon/constants'
import withStyles from 'lib/withStyles'
import CheckoutButton from '../CheckoutButton'

import s from './StoreCreditsButton.module.scss'

const StoreCreditsButton = () => {
  const isActive = useSelector(selectIsPayByCashOnly)
  const { t } = useTranslation('common')

  if (!isActive) return null

  return (
    <CheckoutButton active={!isActive} text={t('pay_by_store_credits')}>
      <CreditElabelz
        className={cn(s.icon, {
          [s.iconActive]: isActive
        })}
      />
    </CheckoutButton>
  )
}

export default withStyles(s)(StoreCreditsButton)
