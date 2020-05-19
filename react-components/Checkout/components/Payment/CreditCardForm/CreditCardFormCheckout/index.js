import { branch } from 'recompose'
import { isElabelz } from 'services/configurationCheck'

import CreditCardForm from './CreditCardForm'
import CreditCardFormElabelz from './CreditCardFormElabelz'
import CreditCardFormBlack from './CreditCardFormBlack'

export default branch(
  () => isElabelz,
  CreditCardFormElabelz,
  CreditCardFormBlack
)(CreditCardForm)
