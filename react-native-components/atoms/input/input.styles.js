import {StyleSheet} from 'react-native';
import Colors from 'theme/colors';
import Fonts from 'theme/fonts';

const styles = {
  wrapper: {
    height: 56,
    borderColor: Colors.gray40,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  input: {
    ...Fonts.largeTextRegular,
    flex: 1,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  leftIcon: {
    marginRight: 10,
  },
  leftPadding: {
    paddingLeft: 16,
  },
  rightPadding: {
    paddingRight: 16,
  },
  focused: {
    borderColor: Colors.primaryColor100,
  },
  error: {
    borderColor: Colors.alert100,
  },
  success: {
    borderColor: Colors.success100,
  },
  disabled: {
    backgroundColor: Colors.gray10,
  },
};

const s = StyleSheet.create(styles);

export default s;
