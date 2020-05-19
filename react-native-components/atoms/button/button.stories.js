import React from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import {boolean, select} from '@storybook/addon-knobs';
import Icon from 'react-native-vector-icons/Feather';

import Button from 'components/atoms/button';

storiesOf('Button', module)
  .add('primary', () => (
    <Button
      onPress={action('clicked!')}
      disabled={boolean('Disabled', false)}
      theme={select('Theme', ['primary', 'secondary', 'ghost', 'destructive'])}
      text={'Click me'}
    />
  ))
  .add('with Left Icon', () => (
    <Button
      onPress={action('clicked!')}
      text={'Click me'}
      disabled={boolean('Disabled', false)}
      theme={select('Theme', ['primary', 'secondary', 'ghost'])}
      LeftIcon={() => <Icon size={16} name="home" />}
    />
  ))
  .add('with Right Icon', () => (
    <Button
      onPress={action('clicked!')}
      text={'Click me'}
      disabled={boolean('Disabled', false)}
      theme={select('Theme', ['primary', 'secondary', 'ghost'])}
      RightIcon={() => <Icon size={16} name="home" />}
    />
  ));
