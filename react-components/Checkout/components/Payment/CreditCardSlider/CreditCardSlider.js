import React, { useState, useRef } from 'react'
import { number } from 'prop-types'

import { mapIndexed } from 'services/commonHelpers'
import { CreditCardsShape } from 'app/shapes'
import Slider from 'components/Slider'
import useViewportEffect from 'lib/hooks/useViewportEffect'
import withStyles from 'lib/withStyles'
import CreditCardListItem from '../CreditCardListItem'

import s from './CreditCardSlider.module.scss'

const CARD_WIDTH = 0.7

const CreditCardSlider = ({ creditCards, selectedCreditCardIndex }) => {
  const ref = useRef()
  const [width, setWidth] = useState('auto')

  useViewportEffect(() => {
    setWidth(ref.current.clientWidth * CARD_WIDTH)
  })

  return (
    <div ref={ref} className={s.wrapper}>
      <Slider
        settings={{
          dots: false,
          autoplay: false,
          variableWidth: true,
          initialSlide: selectedCreditCardIndex
        }}
      >
        {mapIndexed(
          (card, index) => (
            <div key={card.id} className={s.cardWrapper} style={{ width }}>
              <CreditCardListItem card={card} cardIndex={index} />
            </div>
          ),
          creditCards
        )}
      </Slider>
    </div>
  )
}

CreditCardSlider.propTypes = {
  creditCards: CreditCardsShape,
  selectedCreditCardIndex: number
}

CreditCardSlider.defaultProps = {
  creditCards: []
}

export default withStyles(s)(CreditCardSlider)
