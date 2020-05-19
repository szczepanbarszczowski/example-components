import React from 'react'
import { number, string } from 'prop-types'

import { CreditCardShape } from 'app/shapes'
import withStyles from 'lib/withStyles'
import s from './CreditCardListItemDetails.module.scss'

const CreditCardListItemDetails = ({ card: { lastFour }, cardName }) => (
  <div className={s.details}>
    <span className={s.boldText}>{cardName}</span>
    <span>xxxx xxxx xxxx {lastFour}</span>
  </div>
)

CreditCardListItemDetails.propTypes = {
  card: CreditCardShape,
  cardIndex: number,
  cardName: string
}

export default withStyles(s)(CreditCardListItemDetails)
