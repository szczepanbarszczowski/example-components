import React from 'react';
import {View} from 'react-native';
import TextComponent from 'components/atoms/text';
import Icon from 'react-native-vector-icons/FontAwesome';
import s from './inputError.styles';

const InputError = ({children, RightIcon}) => {
  return (
    <View style={s.errorWrapper}>
      {RightIcon && <View style={s.iconWrapper}>{RightIcon()}</View>}
      <View style={s.textWrapper}>
        <TextComponent type="smallTextRegular" color="black">
          {children}
        </TextComponent>
      </View>
    </View>
  );
};

export default InputError;
