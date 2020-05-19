import React, {useState, useCallback} from 'react';
import {View, Platform, TouchableHighlight} from 'react-native';

import TextComponent from 'components/atoms/text';
import s from './button.styles';

const AndroidButton = ({style, ...props}) => (
  <View style={[s.androidButtonWrapper, style]}>
    <TouchableHighlight {...props} />
  </View>
);

const ButtonComponent =
  Platform.OS === 'ios' ? TouchableHighlight : AndroidButton;

const Button = ({
  onPress,
  theme,
  LeftIcon,
  RightIcon,
  text,
  disabled,
  ...rest
}) => {
  const [clicked, setClick] = useState(false);
  const textColor = {
    primary: 'white',
    secondary: 'primaryColor100',
    ghost: 'black',
    destructive: 'white',
  };

  const disabledTextColor = {
    primary: 'gray40',
    secondary: 'gray20',
    ghost: 'gray20',
    destructive: 'gray40',
  };

  const showUnderlay = useCallback(() => {
    setClick(true);
  }, []);

  const hideUnderlay = useCallback(() => {
    setClick(false);
  }, []);

  return (
    <ButtonComponent
      onPress={onPress}
      underlayColor={'white'}
      disabled={disabled}
      onShowUnderlay={showUnderlay}
      onHideUnderlay={hideUnderlay}
      activeOpacity={1}>
      <View
        style={[
          s.button,
          s[theme],
          disabled && s[`${theme}Disabled`],
          clicked && s[`${theme}Clicked`],
        ]}>
        {LeftIcon && (
          <View style={s.leftIcon}>
            <TextComponent
              type="largeTextBold"
              color={disabled ? disabledTextColor[theme] : textColor[theme]}>
              {LeftIcon()}
            </TextComponent>
          </View>
        )}
        {text && (
          <TextComponent
            type="largeTextBold"
            color={disabled ? disabledTextColor[theme] : textColor[theme]}
            {...rest}>
            {text}
          </TextComponent>
        )}
        {RightIcon && (
          <View style={s.rightIcon}>
            <TextComponent
              type="largeTextBold"
              color={disabled ? disabledTextColor[theme] : textColor[theme]}>
              {RightIcon()}
            </TextComponent>
          </View>
        )}
      </View>
    </ButtonComponent>
  );
};

Button.defaultProps = {
  theme: 'primary',
  text: 'Primary button',
};

export default Button;
