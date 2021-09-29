// Libraries
import React, {useState} from 'react';
import {Keyboard, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import storage from '@react-native-firebase/storage';
import {useSelector} from 'react-redux';
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

/**
 * @description
 * This returns an input box that the user can type text into as well as select images to upload along with the message
 *
 * @param {*} chatroomId - Used to specify the specific chatroom the user is sending messages to
 */

const InputBox = ({chatroomId}) => {
  const {user} = useSelector(state => state.auth);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState();

  // Sends any image and text the user as input
  const onSendClick = async (message, image) => {
    if (image) {
      UploadImageAndSendMessage(image, message);
    } else {
      SendMessage(user, chatroomId, message);
    }
  };

  // Will upload image to firebase and then send any text the user submitted
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
          if (snapshot.state === storage.TaskState.SUCCESS) {
            // Image has been uploaded successfully
          }
        },
        error => {
          Alert.alert('An error occured during image upload');
        },
        () => {
          storageRef.getDownloadURL().then(downloadUrl => {
            console.log('Image available at: ' + downloadUrl);

            SendMessage(user, chatroomId, message, downloadUrl);
          });
        },
      );
    } catch (error) {
      Alert.alert(error);
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
          {/* User Selected Image Will Be Shown Here */}
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
          {/* Chat Message Input Field*/}
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
          size={26}
          color={Colors.primary}
          iconName="image"
          onPress={() =>
            launchImageLibrary({mediaType: 'photo'}, res => {
              if (!res.didCancel) setImage(res);
            })
          }
        />
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
