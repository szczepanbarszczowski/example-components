import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { string } from 'prop-types'

import { selectLatestActiveTaxonomy } from 'selectors/navigationSelectors'
import { createSearchUrl } from 'services/url'

import Button from 'components/Buttons/Button'
import Link from 'components/Link'
import withStyles from 'lib/withStyles'
import { taxonomy, special } from 'constants/search'
import urls from 'constants/urls'
import s from './ConfirmationContentPending.module.scss'

const ConfirmationContent = memo(({ orderNumber }) => {
  const { t } = useTranslation('product')

  const activeTaxonomy = useSelector(selectLatestActiveTaxonomy)

  const route = useMemo(
    () =>
      createSearchUrl({
        [taxonomy]: activeTaxonomy,
        [special]: 'NewIn'
      }),
    [activeTaxonomy]
  )
  if (!orderNumber) return null

  return (
    <>
      <img src={require('./image.png')} alt="" className={s.image} />
      <div className={s.title}>{t('thank_you_for_order_pending')}</div>
      <div className={s.contentWrapper}>
        <p className={s.orderNumber}>
          {t('your_order_pending', { orderNumber })}
        </p>
        <div className={s.info}>
          <div className={s.infoItem}>{t('finish_payment')}</div>
        </div>
      </div>
      <p className={s.orderNumberButton}>
        <span className={s.label}>{orderNumber}</span>
      </p>
      <p className={s.goTo}>{t('review_order_info_pending')}</p>
      <Link route={urls.account}>
        <Button buttonStyleType="white-gray" style={s.toAccount}>
          {t('common:pay_in_my_account')}
        </Button>
      </Link>
      <Link route={route}>
        <Button buttonStyleType="primary" style={s.toShop}>
          {t('common:pay_later')}
        </Button>
      </Link>
    </>
  )
})

ConfirmationContent.propTypes = {
  name: string.isRequired,
  orderNumber: string
}

export default withStyles(s)(ConfirmationContent)
