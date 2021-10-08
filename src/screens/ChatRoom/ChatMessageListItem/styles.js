import React from 'react';
import styled from 'styled-components/native';
import Screen from '../../../shared/constants/screen';
import Colors from '../../../shared/constants/colors';
import BasicText from '../../../shared/components/BasicText';

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

export const UserName = styled(props => <BasicText {...props} />)`
  align-self: center;
  font-weight: bold;
  font-size: 14px;
  color: ${Colors.primary};
`;

export const MessageContent = styled(props => <BasicText {...props} />)`
  color: ${props => (props.isMyMessage ? Colors.text : Colors.black)};
`;

export const Time = styled(props => <BasicText {...props} />)`
  color: ${props => (props.isMyMessage ? Colors.text : Colors.black)};
  opacity: 0.7;
  margin-left: auto;
  padding: 3px;
`;
