// Libraries
import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Includes
import Screen from '@shared/constants/screen';
import Colors from '@shared/constants/colors';
import BasicText from '@shared/components/BasicText';

export const ClickableContainer = styled.TouchableOpacity`
  flex: 1;
  height: ${Screen.height * 0.1}px;
  flex-direction: row;
  margin-horizontal: 10px;
`;

export const InfoContainer = styled.View`
  flex: 0.9;
  flex-direction: column;
  margin: 10px;
  justify-content: center;
`;

export const Name = styled(props => <BasicText {...props} />)`
  font-weight: bold;
  color: ${Colors.primary};
`;

export const Description = styled(props => <BasicText {...props} />)`
  color: ${Colors.black};
  opacity: 0.5;
`;

export const IndicatorIcon = styled(Icon)`
  align-self: center;
  margin-right: 10px;
  margin-left: auto;
`;
