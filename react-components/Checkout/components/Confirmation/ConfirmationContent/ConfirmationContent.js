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
import s from './ConfirmationContent.module.scss'

const ConfirmationContent = memo(({ name, orderNumber }) => {
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
      <div className={s.thankYouDesktop}>
        {t('thank_you_for_order', { name })}
      </div>
      <div className={s.thankYouMobile}>
        <p>{t('thank_you')}</p>
        <p>{t('for_your_order', { name })}</p>
      </div>
      <p className={s.orderNumber}>
        {t('will_be_delivered_soon', { orderNumber })}
      </p>
      <div className={s.info}>
        <div className={s.infoItem}>{t('email_sent_information')}</div>
        <div className={s.infoItem}> {t('track_progress_info')}</div>
      </div>
      <p className={s.orderNumberButton}>
        <span className={s.label}>{orderNumber}</span>
      </p>
      <p className={s.goTo}>{t('review_order_info')}</p>
      <Link route={urls.account}>
        <Button buttonStyleType="white-gray" style={s.toAccount}>
          {t('common:my_account')}
        </Button>
      </Link>
      <Link route={route}>
        <Button buttonStyleType="primary" style={s.toShop}>
          {t('common:back_to_shop')}
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
