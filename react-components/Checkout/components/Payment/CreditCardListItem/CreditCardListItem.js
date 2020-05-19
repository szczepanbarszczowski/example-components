import React from 'react'
import { number, bool, func } from 'prop-types'
import cn from 'classnames'

import { CreditCardShape } from 'app/shapes'
import withStyles from 'lib/withStyles'
import CreditCardListItemCheck from '../CreditCardListItemCheck'
import CreditCardListItemDetails from '../CreditCardListItemDetails'
import s from './CreditCardListItem.module.scss'

const CreditCardListItem = ({
  card,
  cardIndex,
  checked,
  disabled,
  onClick
}) => (
  <div
    className={cn(s.wrapper, {
      [s.checked]: checked
    })}
    onClick={onClick}
  >
    <CreditCardListItemCheck
      card={card}
      checked={checked}
      disabled={disabled}
    />
    <CreditCardListItemDetails card={card} cardIndex={cardIndex} />
  </div>
)

CreditCardListItem.propTypes = {
  card: CreditCardShape,
  cardIndex: number,
  checked: bool,
  disabled: bool,
  onClick: func.isRequired
}

export default withStyles(s)(CreditCardListItem)
