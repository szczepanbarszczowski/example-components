import {StyleSheet} from 'react-native';
import {Metrics} from 'theme';
import {Colors, width} from 'theme';
import {isIos} from 'services/helpers';

const styles = StyleSheet.create({
  pagination: {
    marginBottom: 20,
  },

  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: Metrics.productCardHeightBig,
    width,
  },
  wrapper: {
    position: 'relative',
    height: '100%',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  closeButton: {
    position: 'absolute',
    top: ((!isIos ? 0 : 50): number),
    left: 0,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  closeButtonCircle: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
