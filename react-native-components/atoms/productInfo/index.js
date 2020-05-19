import React, {useMemo} from 'react';
import {View} from 'react-native';
import {string, oneOf} from 'prop-types';

import Text from 'components/atoms/text';
import {fontNames} from 'theme/fonts';
import s from './productInfo.styles';

const priceTypesWhenNormalPrice = {
  small: fontNames.textBold,
  medium: fontNames.largeTextBold,
  big: fontNames.header4,
};

const priceTypesWhenPromoPrice = {
  small: fontNames.textRegular,
  medium: fontNames.largeTextRegular,
  big: fontNames.header4,
};

const promoPriceTypes = {
  small: fontNames.textBold,
  medium: fontNames.largeTextBold,
  big: fontNames.header4,
};

const brandNameTextType = {
  small: fontNames.smallTextBold,
  medium: fontNames.textBold,
  big: fontNames.header3,
};

const productNameTextType = {
  small: fontNames.smallTextRegular,
  medium: fontNames.textRegular,
  big: fontNames.textRegular,
};

const ProductInfo = ({brandName, promoPrice, price, productName, type}) => {
  const priceTextType = useMemo(() => {
    if (promoPrice) {
      return priceTypesWhenPromoPrice[type];
    } else {
      return priceTypesWhenNormalPrice[type];
    }
  }, [type, promoPrice]);

  return (
    <View style={type === 'big' ? s.infoContainerBig : s.infoContainer}>
      <Text type={brandNameTextType[type]}>{brandName?.toUpperCase()}</Text>
      <Text type={productNameTextType[type]} textStyle={s.productName}>
        {productName}
      </Text>
      <View style={s.priceContainer}>
        <Text
          type={priceTextType}
          textStyle={[s.firstPriceMargin, promoPrice && s.priceStriked]}>
          {price}
        </Text>
        {promoPrice && (
          <Text textStyle={s.promoPrice} type={promoPriceTypes[type]}>
            {promoPrice}
          </Text>
        )}
      </View>
    </View>
  );
};

ProductInfo.propTypes = {
  brandName: string.isRequired,
  productName: string.isRequired,
  price: string.isRequired,
  promoPrice: string,
  type: oneOf(['big', 'medium', 'small']),
};

ProductInfo.defaultProps = {
  type: 'medium',
};

export default ProductInfo;
