import styled from 'styled-components/native';
import Colors from '../../shared/constants/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.primary};
`;

export const TopContainer = styled.View`
  flex: 0.7;
  justify-content: center;
  align-items: center;
`;

export const BottomContainer = styled.View`
  flex: 0.3;
  align-items: center;
`;

export const ErrorMessageContainer = styled.View`
  flex: 1;
  margin-top: 20px;
  justify-content: center;
`;

export const TextContainer = styled.View`
  background-color: white;
  padding-horizontal: 30px;
  padding-vertical: 10px;
  border-radius: 5px;
`;

export const ErrorMessage = styled.Text`
  color: red;
`;
