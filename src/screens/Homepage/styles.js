import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'italic',
  },
  screen: {
    backgroundColor: '#edeef0',
    flex: 1,
  },
  btnTabActive: {
    backgroundColor: '#7B91F8',
  },
  btntab: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texttab: {
    fontSize: 16,
    color: '#90949E',
    paddingHorizontal: 15,
  },
  texttabActive: {
    color: 'white',
  },
  scrollStyle: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    marginVertical: 10,
    alignSelf: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    color: 'white',
  },
  float: {
    position: 'absolute',
    bottom: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 2,
    right: 10,
  },
  loader: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
  },
});

export default styles;
