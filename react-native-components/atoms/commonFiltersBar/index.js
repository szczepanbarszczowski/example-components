import React, {useState, useMemo} from 'react';
import {func, shape, arrayOf, string} from 'prop-types';
import {TouchableOpacity, FlatList, View} from 'react-native';

import Text from 'components/atoms/text';
import {keyExtractor} from 'services/helpers';
import {fontNames} from 'theme/fonts';
import {colorNames} from 'theme/colors';
import s from './commonFiltersBar.styles';

const allFiltersElement = {label: 'All', value: 'all', id: '0'};

const CommonFiltersBar = ({filters, selectedFilter, onChangeCallback}) => {
  const [selected, setSelected] = useState(selectedFilter || allFiltersElement);
  const availableFilters = useMemo(() => [allFiltersElement, ...filters], [
    filters,
  ]);

  if (!filters) {
    return null;
  }

  return (
    <View style={s.wrapper}>
      <FlatList
        contentContainerStyle={s.contentWrapper}
        data={availableFilters}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          const isSelected = item.value === selected.value;

          return (
            <TouchableOpacity
              key={item.value}
              onPress={() => {
                setSelected(item);
                onChangeCallback && onChangeCallback(item.value);
              }}
              disabled={isSelected}
              style={[s.element, isSelected && s.elementHighlighted]}>
              <Text
                type={fontNames.smallTextRegular}
                color={isSelected ? colorNames.black : colorNames.gray60}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const filterShape = shape({
  label: string,
  value: string,
  id: string,
});

CommonFiltersBar.propTypes = {
  filters: arrayOf(filterShape).isRequired,
  selectedFilter: filterShape,
  onChangeCallback: func,
};

export default CommonFiltersBar;
