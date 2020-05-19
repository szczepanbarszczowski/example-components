import { compose } from 'recompose'
import { withProps } from 'recompose'
import Icon from 'components/Icon'

import withStyles from 'lib/withStyles'

import s from './CreditCardListItemCheck.module.scss'

const props = () => ({
  className: s.check,
  name: 'check',
  size: 16
})

export default compose(
  withProps(props),
  withStyles(s)
)(Icon)
