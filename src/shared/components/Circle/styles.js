// Libraries
import styled from 'styled-components/native';

// Includes
import Screen from '../../constants/screen';

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
