import { compose } from 'redux'
import { withProps, branch } from 'recompose'
import { withAppContext, withI18next } from 'lib'
import CreditCardListItemDetails from './CreditCardListItemDetails'

export default compose(
  withI18next(),
  withAppContext,
  branch(
    ({ context: { isElabelz } }) => isElabelz,
    withProps(({ t, cardIndex }) => ({
      cardName: t('card_index', { index: cardIndex + 1 })
    })),
    withProps(({ card: { name } }) => ({
      cardName: name
    }))
  )
)(CreditCardListItemDetails)
