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
import Colors from '../../../shared/constants/colors';
import {SendMessage} from '../../../shared/firestore/queries';

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

  // Sends any image and text the user has input
  const handleSendMessage = async (message, image) => {
    if (image) {
      UploadImageAndSendMessage(image, message);
    } else {
      SendMessage(user, chatroomId, message);
    }

    // clear message and image
    setMessage('');
    setImage(undefined);
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

  // Open image picker for user to select an image they want to send
  const openImagePicker = () => {
    launchImageLibrary({mediaType: 'photo'}, res => {
      if (res.errorCode) {
        Alert.alert(res.errorMessage);
        return;
      }

      if (!res.didCancel) setImage(res);
    });
  };

  return (
    <Container>
      {/* InputAreaContainer contains Comment Icon, Input Field and Image Select Button */}
      <InputAreaContainer>
        <IconContainer>
          <FontAwesomeIcon name="comment" size={26} color={Colors.secondary} />
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
              handleSendMessage(message, image);
            }}
          />
        </TextInputContainer>

        {/* Select Image */}
        <SelectImageFromGalleryBtn
          size={26}
          color={Colors.primary}
          iconName="image"
          onPress={() => openImagePicker()}
        />
      </InputAreaContainer>

      {/* Send Message Button */}
      <SendBtnContainer image={image} message={message}>
        <SendMessageBtn
          onPress={() => {
            handleSendMessage(message, image);
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
