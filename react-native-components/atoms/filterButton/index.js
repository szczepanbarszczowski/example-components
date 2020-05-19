import React, {useCallback} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {func} from 'prop-types';

import {screenNames} from 'constants/navigation';
import {TouchableOpacity} from 'react-native';
import Text from 'components/atoms/text';
import {fontNames} from 'theme/fonts';
import FiltersIcon from 'components/atoms/icons/filters';
import s from './filterButton.styles';

const FilterButton = ({onPress}) => {
  const {navigate} = useNavigation();
  const onPressHandler = useCallback(() => {
    onPress || navigate(screenNames.filters);
  }, [onPress, navigate]);

  return (
    <TouchableOpacity onPress={onPressHandler} style={s.filtersButtonWrapper}>
      <Text textStyle={s.filterText} type={fontNames.smallTextBold}>
        Filters
      </Text>
      <FiltersIcon />
    </TouchableOpacity>
  );
};

FilterButton.propTypes = {
  onPress: func,
};

export default FilterButton;
