import React from 'react'
import { string } from 'prop-types'

import withStyles from 'lib/withStyles'

import s from './SubmitError.module.scss'

const SubmitError = ({ error }) => <div className={s.error}>{error}</div>

SubmitError.propTypes = {
  error: string.isRequired
}

export default withStyles(s)(SubmitError)
