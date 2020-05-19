import React from 'react'
import pure from 'recompose/pure'
import cn from 'classnames'

import { diorUrl, sportyUrl, flymbleUrl } from 'utils/url'
import { CaseStudyBrief } from 'components/CaseStudyBrief/CaseStudyBrief'
import Img from 'gatsby-image'
import c from './WhatWeDo.module.scss'

export const WhatWeDo = pure(({ diorImage, flymbleImage, sportyImage }) => (
  <div className={c.wrapper}>
    <div className={cn(c.firstSection, c.section)} data-cy="whatWeDoSection1">
      <div className={cn(c.firstCol, c.col)}>
        <CaseStudyBrief
          text="We raise efficiency for well established brands"
          firstWord="Big"
          secondWord="Brands"
          buttonText="See Dior Case Study"
          linkUrl={diorUrl()}
        />
      </div>

      <div className={cn(c.secondCol, c.col, c.img)}>
        <Img sizes={diorImage.sizes} alt="Dior" />
      </div>
    </div>

    <div className={cn(c.secondSection, c.section)} data-cy="whatWeDoSection2">
      <div className={cn(c.firstCol, c.col, c.img)}>
        <Img sizes={sportyImage.sizes} alt="Sporty" />
      </div>

      <div className={cn(c.secondCol, c.col)}>
        <CaseStudyBrief
          text="We enable new  opportunities for Medium Enterprises"
          firstWord="Medium"
          secondWord="Business"
          buttonText="See SportyHQ Case Study"
          linkUrl={sportyUrl()}
        />
      </div>
    </div>

    <div className={cn(c.thirdSection, c.section)} data-cy="whatWeDoSection3">
      <div className={cn(c.firstCol, c.col)}>
        <CaseStudyBrief
          text="We empower amazing startup ideas"
          firstWord="New"
          secondWord="Startups"
          buttonText="See Flymble Case Study"
          linkUrl={flymbleUrl()}
        />
      </div>

      <div className={cn(c.secondCol, c.col, c.img)}>
        <Img sizes={flymbleImage.sizes} alt="Flymble" />
      </div>
    </div>
  </div>
))
