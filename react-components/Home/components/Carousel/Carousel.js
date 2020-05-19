import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Slider from 'nuka-carousel'
import { navigateTo } from 'gatsby-link'
import Img from 'gatsby-image'
import { caseStudiesUrl } from 'utils/url'
import c from './Carousel.module.scss'

const emptyDiv = () => <div />

const settings = {
  slidesToShow: 1.4,
  slidesToScroll: 1,
  infinite: false,
  speed: 300,
  cellSpacing: 15,
  heightMode: 'first',
  edgeEasing: 'easeCubic',
  frameOverflow: 'inherit',
  renderCenterLeftControls: emptyDiv,
  renderCenterRightControls: emptyDiv,
  renderBottomCenterControls: emptyDiv,
}

class CarouselComponent extends PureComponent {
  state = {
    height: 480,
    wasDragged: false,
    mousePositon: {
      x: null,
      y: null,
    },
  }

  setRef = r => {
    this.sliderRef = r
    this.setSize()
  }

  setSize = () => {
    this.setState({
      height: this.sliderRef ? this.sliderRef.clientHeight : 0,
    })
  }

  componentWillReceiveProps = props => {
    props.browser !== this.props.browser && this.setSize()
  }

  setMousePosition = e => {
    e.preventDefault()
    this.setState({
      mousePositon: {
        x: e.clientX,
        y: e.clientY,
      },
    })
  }

  navigateConditionally = e => {
    const { x, y } = this.state.mousePositon
    if (e.clientY === y && e.clientX === x) {
      navigateTo(caseStudiesUrl())
    }
  }

  disableDrag = e => e.preventDefault()

  render() {
    const { height } = this.state
    const { slide1, slide2, slide3 } = this.props

    return (
      <div className={c.slider} style={{ minHeight: height, height }} data-cy="carousel">
        <Slider {...settings} style={{ minHeight: height, height }}>
          <div onMouseDown={this.disableDrag}>
            <Img sizes={slide1} className={c.image} onLoad={this.setSize} alt="Freightable app overview slider image" />
          </div>
          <div onMouseDown={this.disableDrag}>
            <Img sizes={slide2} className={c.image} alt="Flymble app overview slider image" />
          </div>
          <div onMouseDown={this.setMousePosition} onMouseUp={this.navigateConditionally} ref={this.setRef} onLoad={this.setSize}>
            <Img sizes={slide3} className={c.image} alt="See more of our portfolio and app overviews" />
          </div>
        </Slider>
      </div>
    )
  }
}

export const Carousel = connect(state => ({ browser: state.browser }))(CarouselComponent)
