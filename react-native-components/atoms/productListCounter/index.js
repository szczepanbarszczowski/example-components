import React from 'react';
import {oneOfType, number, string} from 'prop-types';
import Text from 'components/atoms/text';
import {fontNames} from 'theme/fonts';
import {colorNames} from 'theme/colors';

const ProductListcounter = ({counter}) => (
  <Text type={fontNames.smallTextRegular} color={colorNames.gray60}>
    {counter} items found
  </Text>
);

ProductListcounter.propTypes = {
  counter: oneOfType([string, number]),
};

export default ProductListcounter;
