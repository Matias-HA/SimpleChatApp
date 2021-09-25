// Libraries
import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Keyboard, Image} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import storage from '@react-native-firebase/storage';
import {useSelector, useDispatch} from 'react-redux';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

// Includes
import Colors from '../../constants/colors';
import {SendMessage} from '../../firestore/queries';

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

const InputBox = ({onPress, chatroomId}) => {
  const {user} = useSelector(state => state.auth);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState();

  const onSendClick = async (message, image) => {
    if (image) {
      console.log('in image');
      UploadImageAndSendMessage(image, message);
    } else {
      console.log('in Message');

      SendMessage(user, chatroomId, message);
    }
  };

  const UploadImageAndSendMessage = async (image, message) => {
    try {
      const fileExtension = image.fileName?.split('.').pop();
      const imageId = uuidv4();
      const fileName = `${imageId}.${fileExtension}`;

      // create bucket storage reference
      const storageRef = storage().ref(`messages/images/${fileName}`);
      // uploads file to firebase storage
      await storageRef.putFile(image.uri).on(
        storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          console.log(
            'progress: ' + snapshot.bytesTransferred / snapshot.totalBytes,
          );

          if (snapshot.state === storage.TaskState.SUCCESS) {
            console.log('Image has been uploaded successfully');
          }
        },
        error => {
          console.log('An error occured during image upload');
          console.log(error);
        },
        () => {
          storageRef.getDownloadURL().then(downloadUrl => {
            console.log('Image available at: ' + downloadUrl);

            SendMessage(user, chatroomId, message, downloadUrl);
          });
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

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
              onSendClick(message, image);
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
            onSendClick(message, image);
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
