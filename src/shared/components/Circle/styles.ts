// Libraries
import React from 'react';
import styled from 'styled-components/native';

// Includes
import Screen from '../../constants/screen';

interface Props {
  height: number;
  color: string;
  top: number;
  right: number;
  elevation: number;
}

export const Circle = styled.View<Props>`
  height: ${(props: Props) => Screen.height * props.height}px;
  width: ${(props: Props) => Screen.height * props.height}px;
  border-radius: ${(props: Props) => (Screen.height * props.height) / 2}px;
  position: absolute;
  background-color: ${(props: Props) => props.color};
  top: ${(props: Props) => Screen.height * props.top || 0}px;
  right: ${(props: Props) => Screen.width * props.right || 0}px;
  elevation: ${(props: Props) => props.elevation};
`;
