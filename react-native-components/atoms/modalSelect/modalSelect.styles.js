import {StyleSheet} from 'react-native';

import {Colors} from 'theme';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  content: {
    backgroundColor: Colors.white,
    paddingBottom: 130,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  options: {
    paddingHorizontal: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  optionWrapper: {
    flex: 1,
    flexBasis: '31%',
    flexGrow: 0,
    borderColor: Colors.gray40,
    borderWidth: 1,
    marginHorizontal: '1%',
    marginVertical: 5,
    padding: 8,
  },

  push: {
    flex: 1,
  },

  activeOption: {
    backgroundColor: Colors.primaryColor100,
  },

  optionText: {
    width: '100%',
    textAlign: 'center',
  },

  heading: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
  },

  closeIcon: {
    position: 'absolute',
    right: 0,
    zIndex: 2,
  },
});

export default styles;
