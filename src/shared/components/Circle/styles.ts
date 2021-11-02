// Libraries
import React from 'react';
import styled from 'styled-components/native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

// Includes
import Screen from '@shared/constants/screen';

interface Props {
  height: number;
  color: string;
  top: number;
  right: number;
  elevation: number;
}

export const Circle = styled.View<Props>`
  height: ${(props: Props) => verticalScale(props.height)}px;
  width: ${(props: Props) => verticalScale(props.height)}px;
  border-radius: ${(props: Props) => verticalScale(props.height) / 2}px;
  position: absolute;
  background-color: ${(props: Props) => props.color};
  top: ${(props: Props) => verticalScale(props.top) || 0}px;
  right: ${(props: Props) => scale(props.right) || 0}px;
  elevation: ${(props: Props) => props.elevation};
`;
