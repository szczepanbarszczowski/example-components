import React from 'react'
import pure from 'recompose/pure'
import PropTypes from 'prop-types'

import { Clutch } from 'components/Clutch/Clutch'
import { Cards } from './Cards'
import c from './ClutchSection.module.scss'

export const ClutchSection = pure(({ lessThanMedium }) => (
  <div className={c.wrapper} data-cy="clutch">
    <div className={c.content}>
      <h2 className={c.title}>
        Leading product design&nbsp;<br />agency on Clutch
      </h2>
      <Cards />
      <Clutch className={c.clutchRating} big lessThanMedium={lessThanMedium} />
    </div>
  </div>
))

ClutchSection.propTypes = {
  lessThanMedium: PropTypes.bool.isRequired,
}
