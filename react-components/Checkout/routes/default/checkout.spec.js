import { getFormWrapperWithState } from 'appTest'

import Checkout from './index'

jest.mock(
  '../../../../components/SkeletonLoaders/ShipmentOptionsLoader',
  () => 'skeleton'
)

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: () => '' }),
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: () => '' }
    return Component
  }
}))

const state = {
  api: {
    cart: {
      loading: false,
      data: [
        {
          shopId: '5be952cf1e418425a69adf6a',
          positionUUID: 'fe28b7c0-6ed4-4685-9184-9926a241efd7',
          quantity: 2,
          expirationDate: '2018-12-24T07:36:21.597Z',
          availableOnStock: 10
        }
      ],
      errors: null
    },
    calculation: {
      loading: false,
      data: {
        currency: {
          code: 'USD'
        },
        costs: {
          products: [
            {
              uuid: 'fe28b7c0-6ed4-4685-9184-9926a241efd7',
              name: 'Teepee',
              images: [],
              size: 'M',
              quantity: 2,
              price: 30.3,
              country: {
                code: 'AE'
              }
            }
          ],
          shipmentCost: 11.2,
          totalPrice: 60.6
        },
        shipments: [
          {
            shopId: '5be952cf1e418425a69adf6a',
            id: '5c0fd45ee348ef34010e5de2',
            name: 'Test shipment 1',
            description: 'description',
            price: 11.2,
            priceDescription: 'price desc',
            stock: ['fe28b7c0-6ed4-4685-9184-9926a241efd7']
          }
        ]
      },
      errors: null
    }
  },
  state: {
    checkout: {
      selectedShipmentAddress: '5bfe556d8b92a6cee1d29886',
      selectedPayment: '5bfe71ddda2393008b8ebc68',
      isAddingPaymentCard: false,
      isAddingShipmentAddress: false,
      isAddingBillingAddress: false,
      editedShipmentAddress: null,
      editedBillingAddress: null,
      selectedBillingAddress: '5bfe556d8b92a6cee1d29886',
      isUsingShippingAddressAsBillingAddres: true,
      currentStep: 'shipping',
      orderId: null
    }
  }
}

describe('Checkout', () => {
  it('matches snapshot', () => {
    const wrapper = getFormWrapperWithState(state, 'form', Checkout, {})
    expect(wrapper).toBeTruthy()
  })
})
