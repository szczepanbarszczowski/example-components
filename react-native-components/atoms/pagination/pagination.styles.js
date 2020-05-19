import {StyleSheet} from 'react-native';
import Colors from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    height: 48,
    marginHorizontal: 18,
    padding: 22,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paginationElement: {
    flexDirection: 'row',
    height: 4,
    flex: 1,
    backgroundColor: Colors.gray100,
    borderRadius: 2,
  },
  active: {
    backgroundColor: Colors.primaryColor100,
  },
  marginRight: {
    marginRight: 12,
  },
});

export default styles;
