import { isPayfort } from 'services/configurationCheck'

const CreditCardForm = isPayfort
  ? require('./CreditCardFormPayfort').default
  : require('./CreditCardFormCheckout').default

export default CreditCardForm
