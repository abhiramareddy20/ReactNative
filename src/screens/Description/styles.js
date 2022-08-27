import {StyleSheet} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils/scaling';

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: DEVICE_WIDTH / 1.1,
    height: DEVICE_HEIGHT / 2,
    alignSelf: 'center',
  },
});

export default styles;
