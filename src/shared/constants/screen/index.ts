// Libraries
import {Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Screen = {
  height: screenHeight,
  width: screenWidth,
};

export default Screen;
