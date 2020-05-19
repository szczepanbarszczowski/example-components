import React from 'react'
import { bool, func, node, string } from 'prop-types'
import cn from 'classnames'

import withStyles from 'lib/withStyles'

import s from './CheckoutButton.module.scss'

const Button = React.forwardRef(
  ({ active, ariaLabel, children, onClick, text, type, id, disabled }, ref) => (
    <button
      ref={ref}
      aria-label={ariaLabel}
      className={cn(s.buttonWrapper, {
        [s.base]: active,
        [s.active]: !active,
        [s.disabled]: disabled
      })}
      disabled={disabled || !active}
      type={type}
      onClick={onClick}
      id={id}
    >
      {text && (
        <span className={cn(s.buttonElement, s.buttonText)}>{text}</span>
      )}
      <div className={s.buttonElement}>{children}</div>
    </button>
  )
)

Button.propTypes = {
  ariaLabel: string,
  active: bool.isRequired,
  children: node,
  onClick: func,
  id: string,
  disabled: bool
}

export default withStyles(s)(Button)
