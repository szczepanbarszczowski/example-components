import React from 'react'
import pure from 'recompose/pure'

import { Flymble } from 'icons/clients/flymble'
import { Dior } from 'icons/caseStudies/Dior'
import { Alcatel } from 'icons/caseStudies/Alcatel'
import { Event } from 'icons/caseStudies/Event'
import c from './Clients.module.scss'

export const Clients = pure(() => (
  <div className={c.clients} data-cy="clients">
    <span className={c.title}>Our clients</span>
    <div className={c.iconsWrap}>
      <Dior className={c.dior} />
      <Flymble className={c.flymble} fill="#000" />
      <Alcatel className={c.alcatel} />
      <Event className={c.event} />
    </div>
  </div>
))
