// Libraries
import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {scale} from 'react-native-size-matters';

// Includes
import Screen from '../../constants/screen';
import Colors from '../../constants/colors';
import BasicText from '../BasicText';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const ContentContainer = styled.View`
  flex: 1;
`;

export const Spacing = styled.View`
  flex: 0.3;
`;

export const TextAndButtonContainer = styled.View`
  flex: 0.7;
  align-self: center;
  width: 65%;
`;

export const Title = styled(props => <BasicText {...props} />)`
  font-weight: bold;
  color: ${Colors.primary};
`;

export const Info = styled(props => <BasicText {...props} />)`
  color: ${Colors.primary};
`;

export const BtnText = styled(props => <BasicText {...props} />)`
  color: ${Colors.white};
`;

export const ReturnBtn = styled.TouchableOpacity`
  margin-top: ${scale(40)}px;
  background-color: ${Colors.primary};
  align-items: center;
  justify-content: center;
  height: ${scale(40)}px;
  border-radius: ${scale(13)}px;
`;
