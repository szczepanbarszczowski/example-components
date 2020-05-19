import React from 'react'
import { func, string } from 'prop-types'
import ArrowBack from 'components/Icons/ArrowBack'
import withStyles from 'lib/withStyles'
import s from './ArrowBackButton.module.scss'

const ArrowBackButton = ({ onClick, label }) => (
  <button className={s.arrowBackButton} onClick={onClick} type="button">
    <ArrowBack className={s.icon} />
    <span className={s.label}>{label}</span>
  </button>
)

ArrowBackButton.propTypes = {
  onClick: func,
  label: string
}

export default withStyles(s)(ArrowBackButton)
