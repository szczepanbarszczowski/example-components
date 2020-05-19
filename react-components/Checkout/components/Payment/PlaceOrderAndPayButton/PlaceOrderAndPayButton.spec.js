import { getReduxComponentWrapper, getDefaultState } from 'appTest'

import { isPayfort } from 'services/configurationCheck'
import { hasCheckoutErrorsSelector } from './PlaceOrderAndPayButton'
import PlaceOrderAndPayButton from './index'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: () => '' }),
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: () => '' }
    return Component
  }
}))

describe('PlaceOrderAndPayButton', () => {
  it('matches snapshot', () => {
    const wrapper = getReduxComponentWrapper(PlaceOrderAndPayButton, {})
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it('errors if no data', () => {
    const result = hasCheckoutErrorsSelector(getDefaultState())
    expect(result).toBe(isPayfort ? false : true)
  })
})
