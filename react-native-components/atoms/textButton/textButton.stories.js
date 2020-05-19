import React from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import {boolean, select} from '@storybook/addon-knobs';
import Icon from 'react-native-vector-icons/Feather';
import TextButton from 'components/atoms/textButton';

storiesOf('TextButton', module)
  .add('primary', () => (
    <TextButton
      onPress={action('clicked!')}
      text={'Click me'}
      disabled={boolean('Disabled', false)}
      theme={select('Theme', ['primary', 'secondary'])}
    />
  ))
  .add('with Left Icon', () => (
    <TextButton
      onPress={action('clicked!')}
      text={'Click me'}
      disabled={boolean('Disabled', false)}
      theme={select('Theme', ['primary', 'secondary'])}
      LeftIcon={() => <Icon size={16} name="home" />}
    />
  ))
  .add('with Right Icon', () => (
    <TextButton
      onPress={action('clicked!')}
      text={'Click me'}
      disabled={boolean('Disabled', false)}
      theme={select('Theme', ['primary', 'secondary'])}
      RightIcon={() => <Icon size={16} name="home" />}
    />
  ));
