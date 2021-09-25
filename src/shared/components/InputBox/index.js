// Libraries
import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Keyboard, Image} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

// Includes
import Colors from '../../constants/colors';

// Styles
import {
  Container,
  InputAreaContainer,
  ImageContainer,
  SelectedImage,
  CancelSelectedImageBtn,
  SelectImageFromGalleryBtn,
  ChatTextInput,
  SendBtnContainer,
  SendMessageBtn,
  IconContainer,
  TextInputContainer,
} from './styles';

const InputBox = ({onPress}) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState();

  return (
    <Container>
      {/* Comment Icon, Input Field and Image Select Button */}
      <InputAreaContainer>
        <IconContainer>
          <FontAwesomeIcon name="comment" size={26} color="#FFCDD2" />
        </IconContainer>

        <TextInputContainer>
          {image ? (
            <ImageContainer>
              <SelectedImage source={{uri: image.uri}} />
              <CancelSelectedImageBtn
                onPress={() => {
                  setImage(undefined);
                }}>
                <FontAwesomeIcon
                  name="close"
                  size={26}
                  color={Colors.primary}
                />
              </CancelSelectedImageBtn>
            </ImageContainer>
          ) : null}
          <ChatTextInput
            placeholder="Type a message"
            multiline
            maxLength={350}
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={() => {
              onPress(message, image);
              setMessage('');
              setImage(undefined);
            }}
          />
        </TextInputContainer>

        {/* Select Image */}
        <SelectImageFromGalleryBtn
          onPress={() =>
            launchImageLibrary({mediaType: 'photo'}, res => {
              console.log(res);
              if (!res.didCancel) setImage(res);
            })
          }>
          <FontAwesomeIcon name="image" size={26} color={Colors.primary} />
        </SelectImageFromGalleryBtn>
      </InputAreaContainer>

      {/* Send Button */}
      <SendBtnContainer image={image} message={message}>
        <SendMessageBtn
          onPress={() => {
            onPress(message, image);
            setMessage('');
            setImage(undefined);
            Keyboard.dismiss();
          }}
          disabled={message || image ? false : true}>
          <FontAwesomeIcon name="send" size={26} color="white" />
        </SendMessageBtn>
      </SendBtnContainer>
    </Container>
  );
};

export default InputBox;
