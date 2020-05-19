let CreditCardSection = {}
/// #if PAYFORT_ENABLED
CreditCardSection = require('./CreditCardSectionPayfort').default
/// #else
CreditCardSection = require('./CreditCardSectionCheckout').default
/// #endif

export default CreditCardSection
