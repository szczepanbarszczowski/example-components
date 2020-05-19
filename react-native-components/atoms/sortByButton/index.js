import React, {useState, useCallback} from 'react';
import {string, arrayOf, shape, func} from 'prop-types';
import {TouchableOpacity} from 'react-native';
import Text from 'components/atoms/text';
import ModalSelect from 'components/atoms/modalSelect';
import {fontNames} from 'theme/fonts';
import s from './sortByButton.styles';

const SortButton = ({options, value, onSelect}) => {
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
      title="Sort"
      value={value}
      onSelect={onSelect}
      options={options}
      OpenerComponent={
        <TouchableOpacity style={s.wrapper} onPress={openSortModal}>
          <Text type={fontNames.smallTextRegular} textStyle={s.sortByText}>
            Sort by:
          </Text>
          <Text type={fontNames.smallTextBold}>{value?.label}</Text>
        </TouchableOpacity>
      }
    />
  );
};

const selectShape = shape({
  label: string,
  value: string,
});

SortButton.propTypes = {
  options: arrayOf(selectShape).isRequired,
  value: selectShape.isRequired,
  onSelect: func,
};

export default SortButton;
