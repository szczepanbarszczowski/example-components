import React from 'react'
import { Link } from 'components/Controls/Link'
import cn from 'classnames'
import c from './ClutchSection.module.scss'

export const Cards = ({ wprapperClassName }) => (
  <div className={c.cards}>
    <div className={cn(c.cardsWrapper, wprapperClassName)}>
      <div className={c.card}>
        <h5 className={c.name}>Kelly Burton</h5>
        <h6 className={c.position}>
          CEO of{' '}
          <Link external to="https://foundersofcolor.com/" className={c.link}>
            Founders of Colour
          </Link>
        </h6>
        <span className={c.text}>"They’re trustworthy, affordable, and have always been incredibly fair."</span>
      </div>
      <div className={c.card}>
        <h5 className={c.name}>David Collins</h5>
        <h6 className={c.position}>Managing Director, NZAPPFACTORY</h6>
        <span className={c.text}>
          "We’re really happy with their work and the support they're providing through the development process."
        </span>
      </div>
      <div className={c.card}>
        <h5 className={c.name}>Henry Weber</h5>
        <h6 className={c.position}>
          Founder,{' '}
          <Link external to="https://www.sportyhq.com/" className={c.link}>
            SportyHQ
          </Link>
        </h6>
        <span className={c.text}>"The quality of their work and their communication makes them stand out."</span>
      </div>
    </div>
  </div>
)
