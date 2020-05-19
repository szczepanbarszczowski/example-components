import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {func, bool} from 'prop-types';

import Grid1 from 'components/atoms/icons/grid1';
import Grid2 from 'components/atoms/icons/grid2';
import {Colors} from 'theme';
import s from './gridSwitcher.styles';

const GridSwitcher = ({isGrid, onPressGrid1, onPressGrid2}) => {
  return (
    <View style={s.wrapper}>
      <TouchableOpacity onPress={onPressGrid1} style={s.grid1}>
        <Grid1 fill={!isGrid ? Colors.primaryColor100 : Colors.gray60} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressGrid2}>
        <Grid2 fill={isGrid ? Colors.primaryColor100 : Colors.gray60} />
      </TouchableOpacity>
    </View>
  );
};

GridSwitcher.propTypes = {
  isGrid: bool,
  onPressGrid1: func.isRequired,
  onPressGrid2: func.isRequired,
};

export default GridSwitcher;
