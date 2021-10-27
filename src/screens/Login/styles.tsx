// Libraries
import React from 'react';
import styled from 'styled-components/native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

// Includes
import Colors from '../../shared/constants/colors';
import Screen from '../../shared/constants/screen';
import BasicText from '../../shared/components/BasicText';

interface Props {
  top: number;
  left: number;
  fontSize: number;
  mirror: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const TopContainer = styled.View`
  flex: 0.8;
  justify-content: center;
  align-items: center;
`;

export const SignInMessage = styled(props => <BasicText {...props} />)`
  color: ${Colors.primary};
  font-weight: bold;
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

export const Icon = styled(FontAwesomeIcon)<Props>`
  position: relative;
  top: ${(props: Props) => scale(props.top)}px;
  left: ${(props: Props) => scale(props.left)}px;
  transform: ${(props: Props) =>
    props.mirror ? `rotateY(180deg)` : `rotateY(0deg)`};
`;

export const TextContainer = styled.View`
  background-color: white;
  padding-horizontal: 30px;
  padding-vertical: 10px;
  border-radius: 5px;
`;

export const ErrorMessage = styled(props => <BasicText {...props} />)`
  color: ${Colors.primary};
  font-size: 14px;
`;
