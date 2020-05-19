// @flow

import React, {useState, useCallback} from 'react';
import {View, TextInput} from 'react-native';

import TextComponent from 'components/atoms/text';
import InputLabel from 'components/atoms/input/inputLabel';
import InputError from 'components/atoms/input/inputError';
import {Colors} from 'theme';
import s from './input.styles';

const Input = ({
  secureTextEntry,
  value,
  placeholder,
  error,
  success,
  disabled,
  LeftIcon,
  RightIcon,
  ErrorIcon,
  label,
  errorMessage,
}) => {
  const [isTextHidden, changeTextHiddenFlag] = useState(true);
  const [isFocused, changeFocusedState] = useState(false);
  const [valueState, onChangeText] = React.useState(value);

  const toggleTextHiddenFlag = useCallback(() => {
    changeTextHiddenFlag(!isTextHidden);
  }, [isTextHidden]);

  return (
    <View>
      {label && <InputLabel>{label}</InputLabel>}
      <View
        style={[
          s.wrapper,
          isFocused && s.focused,
          disabled && s.disabled,
          success && s.success,
          error && s.error,
          LeftIcon && s.leftPadding,
          RightIcon && s.rightPadding,
        ]}>
        {LeftIcon && (
          <View style={[s.iconWrapper, s.leftIcon]}>{LeftIcon()}</View>
        )}
        <TextInput
          style={s.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && isTextHidden}
          onChangeText={text => onChangeText(text)}
          value={valueState}
          editable={!disabled}
          onFocus={() => changeFocusedState(true)}
          onBlur={() => changeFocusedState(false)}
          // autoCapitalize="none"
          placeholderTextColor={Colors.gray40}
          underlineColorAndroid="transparent"
        />
        {RightIcon && <View style={s.iconWrapper}>{LeftIcon()}</View>}
      </View>
      {errorMessage && (
        <InputError RightIcon={ErrorIcon}>{errorMessage}</InputError>
      )}
    </View>
  );
};

export default Input;
