import React from 'react';
import {number} from 'prop-types';
import {View} from 'react-native';
import s from './pagination.styles';

const Pagination = ({length, position, style}) => (
  <View style={[s.container, style]}>
    {[...Array(length)].fill(1).map((_, i) => (
      <View
        key={i}
        style={[
          s.paginationElement,
          position === i && s.active,
          i !== length && s.marginRight,
        ]}
      />
    ))}
  </View>
);

Pagination.propTypes = {
  length: number,
  position: number,
};

export default Pagination;
