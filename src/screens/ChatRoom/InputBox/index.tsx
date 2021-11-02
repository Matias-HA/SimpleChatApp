// Libraries
import React, {useState} from 'react';
import {Keyboard, Alert} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {scale} from 'react-native-size-matters';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import storage from '@react-native-firebase/storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

// Includes
import {useReduxSelector} from '@shared/redux/hooks';
import Colors from '@shared/constants/colors';
import {SendMessage} from '@shared/firestore/queries';

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

interface Props {
  chatroomId: string;
}

/**
 * @description
 * This returns an input box that the user can type text into as well as select images to upload along with the message
 *
 * @param {*} chatroomId - Used to specify the specific chatroom the user is sending messages to
 */

const InputBox = ({chatroomId}: Props) => {
  const [message, setMessage] = useState<string>('');
  const [image, setImage] = useState<ImagePickerResponse>();
  const user = useReduxSelector(state => state.auth.user);

  // Sends any image and text the user has input
  const handleSendMessage = async (
    message: string,
    image: ImagePickerResponse | undefined,
  ) => {
    if (image) {
      UploadImageAndSendMessage(message, image);
    } else {
      SendMessage(chatroomId, message);
    }

    // clear message and image
    setMessage('');
    setImage(undefined);
  };

  // Will upload image to firebase and then send any text the user submitted
  const UploadImageAndSendMessage = async (
    message: string,
    image: ImagePickerResponse,
  ) => {
    try {
      const fileExtension = image.fileName?.split('.').pop();
      const imageId = uuidv4();
      const imageUri: string | undefined = image.uri;
      const fileName = `${imageId}.${fileExtension}`;

      // create bucket storage reference
      const storageRef = storage().ref(`messages/images/${fileName}`);

      // Will not be able to upload if imageUri for some reason is undefined
      if (imageUri === undefined) {
        throw new Error('Unexpected error: Missing image uri');
      }

      // uploads file to firebase storage
      await storageRef.putFile(imageUri).on(
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
            SendMessage(chatroomId, message, downloadUrl);
          });
        },
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  };

  // Open image picker for user to select an image they want to send
  const openImagePicker = async () => {
    await launchImageLibrary({mediaType: 'photo'}, res => {
      if (res.errorCode) {
        if (res.errorMessage === 'string') Alert.alert(res.errorMessage);
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
          <FontAwesomeIcon
            name="comment"
            size={scale(24)}
            color={Colors.secondary}
          />
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
                  size={scale(24)}
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
          size={scale(22)}
          color={Colors.primary}
          iconName="image"
          onPress={() => openImagePicker()}
          mirror={false}
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
          <FontAwesomeIcon name="send" size={scale(22)} color="white" />
        </SendMessageBtn>
      </SendBtnContainer>
    </Container>
  );
};

export default InputBox;
