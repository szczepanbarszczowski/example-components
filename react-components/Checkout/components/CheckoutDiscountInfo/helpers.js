const discountLabel = {
  FixedAmount: (value, currency, t) =>
    t('currency', { data: { value: value, currency } }),
  Percentage: value => `${value}%`,
  FreeShipping: (_amount, _currency, t) => t('free_shipping')
}

export const getDiscountLabel = (type, value, currency, t) =>
  discountLabel[type](value, currency, t)
