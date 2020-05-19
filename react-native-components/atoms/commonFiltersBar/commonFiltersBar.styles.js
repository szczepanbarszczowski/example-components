import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

const styles = StyleSheet.create({
  wrapper: {
    height: 48,
    backgroundColor: Colors.white,
  },
  contentWrapper: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  element: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  elementHighlighted: {
    borderBottomWidth: 1,
    borderColor: Colors.primaryColor100,
    borderRadius: 1,
  },
});

export default styles;
