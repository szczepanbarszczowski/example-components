import React from 'react'
import pure from 'recompose/pure'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ArrowButton } from 'components/Controls/ArrowButton'
import { Hr } from 'components/Hr/Hr'
import { contactUrl } from 'utils/url'
import { Layout } from 'layouts/Layout'

import { Helmet } from 'react-helmet'
import { WhatWeDo } from './components/WhatWeDo/WhatWeDo'
import { ContactSection } from './components/ContactSection/ContactSection'
import { ClutchSection } from './components/ClutchSection/ClutchSection'
import { Clients } from './components/Clients/Clients'
import { Carousel } from './components/Carousel/Carousel'

import c from './Home.module.scss'

const HomeComponent = pure(({ lessThanMedium, data }) => (
  <div className={c.wrapper}>
    <Helmet>
      <title>We are full-service digital product agency | 7ninjas</title>
      <meta
        name="description"
        content="Find your product agency that creates successful digital projects. We help startups and developed businesses create engaging websites, useful mobile applications and sophisticated back end solutions. What makes us not like every other software house is our understanding of business and approach to help our clients build their models."
      />
      <meta name="keywords" content="product agency, digital product, website, mobile application, software house" />
    </Helmet>

    <div className={c.innerWrapper}>
      <div className={c.headingSection}>
        <div className={c.heading} data-cy="introduction">
          We <span className={c.bold}>design</span> digital{!lessThanMedium ? <br /> : ' '}products{lessThanMedium ? <br /> : ' '}that
          everyone{!lessThanMedium ? <br /> : ' '}loves to use
        </div>
        <ArrowButton to={contactUrl()}>Hire us</ArrowButton>
      </div>
    </div>

    <Carousel slide1={data.slide1.sizes} slide2={data.slide2.sizes} slide3={data.slide3.sizes} />

    <div className={c.innerWrapper}>
      <Clients />
    </div>

    <div className={c.innerWrapper}>
      <div className={c.secondSection} data-cy="7what">
        <div className={c.heading}>7what?</div>
        <h1 className={c.paragraph}>
          7ninjas is a team of <span className={c.paragraphBold}>designers and developers</span>
          {lessThanMedium ? <br /> : ' '}creating beautiful {!lessThanMedium ? <br /> : ' '}web and mobile apps. Oh, and there’s more than 7
          of us.{' '}
        </h1>
        <ArrowButton to={contactUrl()} className={c.getInTouchBtn}>
          Get in touch
        </ArrowButton>
      </div>
    </div>

    <div className={c.innerWrapper}>
      <Hr text="What we do" />
    </div>

    <div className={c.innerWrapper}>
      <WhatWeDo diorImage={data.diorImage} flymbleImage={data.flymbleImage} sportyImage={data.sportyImage} />
    </div>

    <div className={c.innerWrapper}>
      <Hr text="Clutch" />
    </div>

    <ClutchSection lessThanMedium={lessThanMedium} />

    <div className={c.innerWrapper}>
      <ContactSection />
    </div>
  </div>
))

HomeComponent.propTypes = {
  lessThanMedium: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ browser }) => ({ lessThanMedium: browser.lessThan.medium })

const HomeConnect = connect(mapStateToProps)(HomeComponent)

export const Home = props => (
  <Layout>
    <HomeConnect {...props} />
  </Layout>
)
