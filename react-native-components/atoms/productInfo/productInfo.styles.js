import {StyleSheet} from 'react-native';
import {Colors} from 'theme/index';

const styles = {
  infoContainer: {
    paddingVertical: 4,
  },
  infoContainerBig: {
    paddingVertical: 16,
  },
  productName: {
    marginVertical: 2,
    color: Colors.gray80,
  },
  priceContainer: {
    flexDirection: 'row',
  },
  firstPriceMargin: {
    marginRight: 8,
  },
  priceStriked: {
    textDecorationLine: 'line-through',
    color: Colors.gray80,
  },
  promoPrice: {
    color: Colors.primaryColor100,
  },
};

const s = StyleSheet.create(styles);

export default s;
