import React, { memo } from 'react'
import { string } from 'prop-types'

import ConfirmationLoader from 'components/SkeletonLoaders/Confirmation'

const Loader = memo(({ orderNumber }) => {
  if (orderNumber) return null

  return <ConfirmationLoader />
})

Loader.propTypes = {
  orderNumber: string
}

export default Loader
