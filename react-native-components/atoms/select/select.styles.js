import {StyleSheet} from 'react-native';
import {Colors} from 'theme/index';

const styles = StyleSheet.create({
  wrapper: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: Colors.gray5,
    borderRadius: 5,
  },
  textStyle: {
    marginLeft: 20,
  },
  chevron: {
    marginRight: 14,
  },
});

export default styles;
