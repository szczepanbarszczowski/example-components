import React from 'react';
import {storiesOf} from '@storybook/react-native';

import Accordion from './';

storiesOf('Accordion', module).add('With content', () => (
  <Accordion
    sections={[
      {
        title: 'with label & annotation',
        content: [{title: 'label', text: 'text'}],
      },
      {
        title: 'with label & annotation',
        content: [{title: 'label', text: 'text'}],
      },
    ]}
    onExpand={() => {}}
  />
));
