import styled from 'styled-components/native';
import Colors from '../../shared/constants/colors';
import Screen from '../../shared/constants/screen';

export const Container = styled.View`
  flex: 1;
`;

export const TopContainer = styled.View`
  flex: 0.7;
  justify-content: center;
  align-items: center;
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
  z-index: 1;
`;

export const BottomContainer = styled.View`
  flex: 0.5;
  align-items: center;
`;

export const ErrorMessageContainer = styled.View`
  flex: 1;
  margin-top: 30px;
  justify-content: flex-start;
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
