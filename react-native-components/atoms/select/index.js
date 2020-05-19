import React, {useState, useCallback} from 'react';
import {string, arrayOf, shape, func} from 'prop-types';
import {TouchableOpacity} from 'react-native';
import Text from 'components/atoms/text';
import ModalSelect from 'components/atoms/modalSelect';
import ChevronDown from 'components/atoms/icons/chevronArrowDown';
import {fontNames} from 'theme/fonts';
import Colors, {colorNames} from 'theme/colors';
import s from './select.styles';

const Select = ({options, value, onSelect, placeholder}) => {
  const [selectVisible, setSelectVisibility] = useState(false);

  const closeSortModal = useCallback(() => {
    setSelectVisibility(false);
  }, []);

  const openSortModal = useCallback(() => {
    setSelectVisibility(true);
  }, []);

  return (
    <ModalSelect
      close={closeSortModal}
      visible={selectVisible}
      title={placeholder}
      value={value}
      onSelect={onSelect}
      options={options}
      OpenerComponent={
        <TouchableOpacity style={s.wrapper} onPress={openSortModal}>
          <Text
            type={fontNames.largeTextRegular}
            textStyle={s.textStyle}
            color={colorNames.gray40}>
            {value?.label || placeholder}
          </Text>
          <ChevronDown fill={Colors.gray40} style={s.chevron} />
        </TouchableOpacity>
      }
    />
  );
};

const selectShape = shape({
  label: string,
  value: string,
});

Select.propTypes = {
  options: arrayOf(selectShape).isRequired,
  value: selectShape,
  placeholder: string.isRequired,
  onSelect: func,
};

export default Select;
