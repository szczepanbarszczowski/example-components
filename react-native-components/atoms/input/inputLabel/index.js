import React from 'react';
import {View} from 'react-native';
import TextComponent from 'components/atoms/text';
import s from './inputLabel.styles';

const InputLabel = ({children}) => {
  return (
    <View style={s.labelWrapper}>
      <TextComponent type="header4" color="black">
        {children}
      </TextComponent>
    </View>
  );
};

export default InputLabel;
