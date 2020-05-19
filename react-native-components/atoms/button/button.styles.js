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
  button: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
  leftIcon: {
    ...icon,
    marginRight: 12,
  },
  rightIcon: {
    ...icon,
    marginLeft: 12,
  },
  primary: {
    backgroundColor: Colors.primaryColor100,
  },
  primaryClicked: {
    backgroundColor: Colors.primaryColor85,
  },
  primaryDisabled: {
    backgroundColor: Colors.gray5,
  },
  secondary: {
    backgroundColor: Colors.white,
    borderColor: Colors.primaryColor100,
    borderWidth: 1,
  },
  secondaryClicked: {
    backgroundColor: Colors.primaryColor10,
  },
  secondaryDisabled: {
    backgroundColor: Colors.white,
    borderColor: Colors.gray10,
  },
  ghost: {
    backgroundColor: Colors.white,
    borderColor: Colors.gray20,
    borderWidth: 1,
  },
  ghostClicked: {
    borderColor: Colors.gray100,
  },
  ghostDisabled: {
    backgroundColor: Colors.white,
    borderColor: Colors.gray10,
  },
  destructive: {
    backgroundColor: Colors.alert100,
  },
  destructiveClicked: {
    backgroundColor: Colors.alert85,
  },
  destructiveDisabled: {
    backgroundColor: Colors.gray5,
  },
};

const s = StyleSheet.create(styles);

export default s;
