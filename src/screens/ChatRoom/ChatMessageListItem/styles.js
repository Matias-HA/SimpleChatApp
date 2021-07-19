import styled from 'styled-components/native';
import Screen from '../../../shared/constants/screen';
import Colors from '../../../shared/constants/colors';

export const Container = styled.View`
  align-self: ${props => (props.isMyMessage ? 'flex-end' : 'flex-start')}
  background-color: ${props => (props.isMyMessage ? Colors.primary : 'white')};
  margin: 15px;
  border-radius: 5px;
`;

export const MessageContainer = styled.View`
  width: 60%;
  margin-vertical: 5px;
  margin-horizontal: 15px;
`;

export const UserInfoContainer = styled.View`
  flex-direction: row;
`;

export const UserAvatar = styled.Image`
  width: ${Screen.width * 0.08}px;
  height: ${Screen.width * 0.08}px;
  border-radius: ${Screen.width * 0.04}px;
  margin-right: 10px;
`;

export const MessageImage = styled.Image`
  width: ${Screen.width * 0.55}px;
  height: ${Screen.width * 0.35}px;
  border-radius: ${Screen.width * 0.02}px;
  margin-vertical: 10px;
`;

export const UserName = styled.Text`
  align-self: center;
  color: ${Colors.primary};
  font-size: 14px;
  font-weight: bold;
`;

export const MessageContent = styled.Text`
  color: ${props => (props.isMyMessage ? Colors.text : 'black')};
`;

export const Time = styled.Text`
  color: ${props => (props.isMyMessage ? Colors.text : 'black')};
  font-size: 12px;
  opacity: 0.5;
  margin-left: auto;
  padding: 3px;
`;
