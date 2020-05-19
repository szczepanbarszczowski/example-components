import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {select} from '@storybook/addon-knobs';
import TextComponent from 'components/atoms/text/index';
import Colors from 'theme/colors';
const colors = Object.keys(Colors);

storiesOf('Text', module)
  .add('header', () => (
    <TextComponent
      type={select(
        'Header',
        ['header1', 'header2', 'header3', 'header4', 'header5', 'header6'],
        'header1',
      )}
      color={select('Color', colors)}>
      My custom text
    </TextComponent>
  ))
  .add('regular', () => (
    <TextComponent
      type={select(
        'Regular',
        [
          'largeTextRegular',
          'textRegular',
          'smallTextRegular',
          'labelRegular',
          'tinyTextRegular',
        ],
        'largeTextRegular',
      )}
      color={select('Color', colors)}>
      My custom text
    </TextComponent>
  ))
  .add('bold', () => (
    <TextComponent
      type={select('Regular', [
        'largeTextBold',
        'textBold',
        'smallTextBold',
        'labelBold',
        'tinyTextBold',
      ])}
      color={select('Color', colors)}>
      My custom text
    </TextComponent>
  ))
  .add('caption', () => (
    <TextComponent type="caption" color={select('Color', colors)}>
      My custom text
    </TextComponent>
  ));
