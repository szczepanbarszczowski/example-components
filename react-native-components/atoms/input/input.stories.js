import React from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import {boolean, select} from '@storybook/addon-knobs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Input from 'components/atoms/input';

storiesOf('Input', module)
  .add('primary', () => (
    <Input
      onPress={action('clicked!')}
      disabled={boolean('Disabled', false)}
      placeholder="Input empty"
      text={'Click me'}
    />
  ))
  .add('left icon', () => (
    <Input
      onPress={action('clicked!')}
      disabled={boolean('Disabled', false)}
      placeholder="Input empty"
      LeftIcon={() => <Icon size={24} name="home" />}
      text={'Click me'}
    />
  ))
  .add('right icon', () => (
    <Input
      onPress={action('clicked!')}
      disabled={boolean('Disabled', false)}
      placeholder="Input empty"
      RightIcon={() => <Icon size={24} name="home" />}
      text={'Click me'}
    />
  ))
  .add('success', () => (
    <Input
      onPress={action('clicked!')}
      placeholder="Input empty"
      success={boolean('Success', true)}
      value={'input success'}
      text={'Click me'}
    />
  ))
  .add('error', () => (
    <Input
      onPress={action('clicked!')}
      placeholder="Input empty"
      error={boolean('Error', true)}
      value={'input alert'}
      text={'Click me'}
    />
  ))
  .add('with label', () => (
    <Input
      onPress={action('clicked!')}
      disabled={boolean('Disabled', false)}
      placeholder="Input empty"
      label="Input label"
      text={'Click me'}
    />
  ))
  .add('with error', () => (
    <Input
      onPress={action('clicked!')}
      disabled={boolean('Disabled', false)}
      placeholder="Input empty"
      error
      errorMessage="This field is required"
    />
  ))
  .add('with icon error', () => (
    <Input
      onPress={action('clicked!')}
      disabled={boolean('Disabled', false)}
      placeholder="Input empty"
      error
      errorMessage="This field is required"
      ErrorIcon={() => <Icon name="exclamation-circle" size={14} />}
    />
  ));
