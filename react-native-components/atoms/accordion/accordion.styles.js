import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

const s = StyleSheet.create({
  headerWrapper: {
    borderBottomWidth: 1,
    borderColor: Colors.gray10,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
  },
  headerItemsWrapper: {
    overflow: 'hidden',
    flex: 1,
  },
  contentWrapper: {
    marginBottom: 25,
  },
});

export default s;
