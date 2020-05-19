import {StyleSheet} from 'react-native';
import Colors from 'theme/colors';

const icon = {
  justifyContent: 'center',
  alignItems: 'center',
  width: 28,
  height: 28,
};

const styles = {
  androidButtonWrapper: {
    overflow: 'hidden',
  },
  touchable: {
    alignSelf: 'center',
    padding: 15,
  },
  button: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  leftIcon: {
    ...icon,
    marginRight: 12,
  },
  rightIcon: {
    ...icon,
    marginLeft: 12,
  },
  clicked: {textDecorationLine: 'underline'},
};

const s = StyleSheet.create(styles);

export default s;
