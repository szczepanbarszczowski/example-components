import React, {useState, useCallback} from 'react';
import {View, Platform, TouchableHighlight} from 'react-native';

import TextComponent from 'components/atoms/text';
import s from './textButton.styles';

const AndroidButton = ({style, ...props}) => (
  <View style={[s.androidButtonWrapper, style]}>
    <TouchableHighlight {...props} />
  </View>
);

const ButtonComponent =
  Platform.OS === 'ios' ? TouchableHighlight : AndroidButton;

const TextButton = ({
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
    primary: 'primaryColor100',
    secondary: 'black',
  };

  const disabledTextColor = {
    primary: 'gray20',
    secondary: 'gray20',
  };

  const showUnderlay = useCallback(() => {
    setClick(true);
  }, []);

  const hideUnderlay = useCallback(() => {
    setClick(false);
  }, []);

  return (
    <ButtonComponent
      style={s.touchable}
      onPress={onPress}
      underlayColor={'transparent'}
      disabled={disabled}
      onShowUnderlay={showUnderlay}
      onHideUnderlay={hideUnderlay}
      activeOpacity={1}>
      <View style={s.button}>
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
            textStyle={clicked && s.clicked}
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

TextButton.defaultProps = {
  theme: 'primary',
  text: 'Primary button',
};

export default TextButton;
