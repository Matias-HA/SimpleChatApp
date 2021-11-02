// Libraries
import React from 'react';
import styled from 'styled-components/native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {ImagePickerResponse} from 'react-native-image-picker';

// Includes
import Colors from '../../../shared/constants/colors';
import Screen from '../../../shared/constants/screen';
import IconBtn from '../../../shared/components/IconBtn';

interface Props {
  message: string;
  image: ImagePickerResponse | undefined;
}

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  margin-vertical: ${verticalScale(7.5)}px;
`;

export const InputAreaContainer = styled.View`
  width: ${scale(270)}px;
  flex-direction: row;
  background-color: white;
  border-radius: 40px;
  justify-content: flex-end;
  align-items: center;
  padding-right: ${scale(10)}px;
`;

export const TextInputContainer = styled.View`
  width: ${scale(200)}px;
`;

export const ImageContainer = styled.View`
  padding-vertical: 5px;
  flex-direction: row;
`;

export const IconContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const SelectedImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-vertical: 10px;
`;

export const CancelSelectedImageBtn = styled.TouchableOpacity`
  padding-left: 5px;
  padding-top: 5px;
`;

export const ChatTextInput = styled.TextInput`
  font-size: ${scale(16)}px;
  margin-horizontal: ${scale(5)}px;
  padding: 0px;
`;

export const SelectImageFromGalleryBtn = styled(IconBtn)``;

export const SendBtnContainer = styled.View<Props>`
  align-items: center;
  justify-content: flex-end;
  opacity: ${(props: Props) => (props.message || props.image ? 1 : 0.5)};
`;

export const SendMessageBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${Colors.primary};
  border-radius: ${scale(50) / 2}px;
  width: ${scale(50)}px;
  height: ${scale(50)}px;
`;
