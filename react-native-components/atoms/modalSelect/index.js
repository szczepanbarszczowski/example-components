import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Modal from 'components/atoms/modal';
import Text from 'components/atoms/text';
import CloseIcon from 'components/atoms/icons/close';
import {Colors} from 'theme';
import {fontNames} from 'theme/fonts';
import {colorNames} from 'theme/colors';

import s from './modalSelect.styles';

const hitSlopValue = {top: 20, bottom: 20, left: 20, right: 20};

const ModalSelect = ({
  close,
  visible,
  onSelect,
  options = [],
  value,
  title,
  OpenerComponent,
}) => (
  <>
    {OpenerComponent}
    <Modal close={close} isVisible={visible} style={s.modal}>
      <View style={s.content}>
        <View>
          <TouchableOpacity
            style={s.closeIcon}
            hitSlop={hitSlopValue}
            onPress={close}>
            <CloseIcon fill={Colors.black} />
          </TouchableOpacity>
          <Text
            color={colorNames.gray60}
            textStyle={s.heading}
            type={fontNames.largeTextBold}>
            {title}
          </Text>
        </View>

        <View style={s.options}>
          {options.map((option, index) => {
            const isActive = option?.value === value?.value;
            return (
              <TouchableOpacity
                key={option.value + index}
                style={[s.optionWrapper, isActive && s.activeOption]}
                onPress={() => {
                  onSelect && onSelect(option);
                  close();
                }}>
                <Text
                  textStyle={s.optionText}
                  color={isActive ? colorNames.white : colorNames.black}
                  type={isActive ? fontNames.textBold : fontNames.textRegular}
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                  minimumFontScale={0.5}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
          <View style={s.push} />
        </View>
      </View>
    </Modal>
  </>
);

export default ModalSelect;
