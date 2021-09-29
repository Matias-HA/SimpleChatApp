import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../constants/colors';
import Screen from '../../constants/screen';
import IconBtn from '../../components/IconBtn';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 10px;
`;

export const InputAreaContainer = styled.View`
  width: ${Screen.width * 0.8}px;
  flex-direction: row;
  background-color: white;
  border-radius: 40px;
  justify-content: flex-end;
  align-items: flex-end;
  padding-bottom: ${Screen.height * 0.017}px;
  padding-right: 10px;
`;

export const TextInputContainer = styled.View`
  width: 75%;
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
  font-size: 17px;
  margin-horizontal: 5px;
  padding: 0px;
`;

export const SelectImageFromGalleryBtn = styled(IconBtn)``;

export const SendBtnContainer = styled.View`
  align-items: center;
  justify-content: flex-end;
  opacity: ${({message, image}) => (message || image ? 1 : 0.5)};
`;

export const SendMessageBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${Colors.primary};
  border-radius: ${Screen.width * 0.07}px;
  width: ${Screen.width * 0.15}px;
  height: ${Screen.width * 0.15}px;
`;
