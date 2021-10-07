import styled from 'styled-components/native';
import Colors from '../../shared/constants/colors';
import Screen from '../../shared/constants/screen';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export const Container = styled.View`
  flex: 1;
`;

export const TopContainer = styled.View`
  flex: 0.8;
  justify-content: center;
  align-items: center;
`;

export const SignInMessage = styled.Text`
  color: ${Colors.primary};
  font-size: 26px;
  font-weight: bold;
`;

export const Circle = styled.View`
  height: ${({height}) => Screen.height * height}px;
  width: ${({height}) => Screen.height * height}px;
  border-radius: ${({height}) => (Screen.height * height) / 2}px;
  position: absolute;
  background-color: ${({color}) => color};
  top: ${({top}) => Screen.height * top || 0}px;
  right: ${({right}) => Screen.width * right || 0}px;
  elevation: ${({elevation}) => elevation};
`;

export const BottomContainer = styled.View`
  flex: 0.4;
  align-items: center;
`;

export const IconContainer = styled.View`
  flex-direction: row;
`;

export const ErrorMessageContainer = styled.View`
  flex: 1;
  margin-top: 30px;
  justify-content: flex-start;
`;

export const Icon = styled(FontAwesomeIcon)`
  position: relative;
  top: ${({top}) => Screen.height * top}px;
  left: ${({left}) => Screen.width * left}px;
  transform: ${({mirror}) => (mirror ? `rotateY(180deg)` : `rotateY(0deg)`)};
`;

export const TextContainer = styled.View`
  background-color: white;
  padding-horizontal: 30px;
  padding-vertical: 10px;
  border-radius: 5px;
`;

export const ErrorMessage = styled.Text`
  color: ${Colors.primary};
`;
