import React from 'react'
import { func, string, bool } from 'prop-types'
import Button from 'components/Buttons/Button'
import withStyles from 'lib/withStyles'
import s from './CancelButton.module.scss'

const CancelButton = ({ className, onClick, t, isHidden }) => (
  <Button
    className={className}
    style={{ [s.isHidden]: isHidden }}
    text={t('common:cancel')}
    onClick={onClick}
    buttonStyleType="gray"
  />
)

CancelButton.propTypes = {
  onClick: func,
  t: func,
  className: string,
  isHidden: bool
}

export default withStyles(s)(CancelButton)
