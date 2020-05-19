import { compose, withProps } from 'recompose'

import PaymentMethods from 'components/PaymentMethods'

import withStyles from 'lib/withStyles'

import s from './PaymentMethods.module.scss'

export default compose(
  withProps({ className: s.methods }),
  withStyles(s)
)(PaymentMethods)
