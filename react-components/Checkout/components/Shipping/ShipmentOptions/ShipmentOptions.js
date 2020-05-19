import React from 'react'

import { ShipmentMethodsShape } from 'app/shapes'
import { ShipmentOptionsLoader } from 'components/SkeletonLoaders'

import withStyles from 'lib/withStyles'
import ShipmentOption from '../ShipmentOption'
import s from './ShipmentOptions.module.scss'

const ShipmentOptions = ({ shipmentOptions }) => (
  <div className={s.shipment}>
    {shipmentOptions.length ? (
      shipmentOptions.map((option, key) => (
        <ShipmentOption key={key} option={option} />
      ))
    ) : (
      <ShipmentOptionsLoader />
    )}
  </div>
)
ShipmentOptions.propTypes = {
  shipmentOptions: ShipmentMethodsShape
}

export default withStyles(s)(ShipmentOptions)
