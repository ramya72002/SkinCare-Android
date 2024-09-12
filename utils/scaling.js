import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const scale = (size) => (width / 375) * size; // Base width is 375
const verticalScale = (size) => (height / 667) * size; // Base height is 667

export { scale, verticalScale };
