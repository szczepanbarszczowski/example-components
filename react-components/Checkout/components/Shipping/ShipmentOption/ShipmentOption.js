import React from 'react'
import { func, string } from 'prop-types'
import cn from 'classnames'

import { ShipmentMethodShape } from 'app/shapes'

import Icon from 'components/Icon'
import withStyles from 'lib/withStyles'
import s from './ShipmentOption.module.scss'

const ShipmentOption = ({
  option: { name, description, price, priceDescription },
  t,
  currency
}) => (
  <div className={s.shipmentOption}>
    <Icon name="check" checked className={s.check} />
    <div className={cn(s.section, s.sectionFirst)}>
      <div className={s.name}>{name}</div>
      <div>{description}</div>
    </div>
    <div className={cn(s.section, s.sectionLast)}>
      <div className={s.price}>
        {t('common:currency', {
          data: { value: price, currency }
        })}
      </div>
      <div className={s.priceDescription}>{priceDescription}</div>
    </div>
  </div>
)

ShipmentOption.propTypes = {
  option: ShipmentMethodShape.isRequired,
  t: func,
  currency: string
}

export default withStyles(s)(ShipmentOption)
